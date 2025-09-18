import { Router } from 'express';
import { z } from 'zod';

import { prisma } from '../../db/client';
import { asyncHandler } from '../../utils/asyncHandler';

const createAlbumSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  eventId: z.number().int().positive().optional(),
  createdById: z.number().int().positive(),
  coverImage: z.string().url().optional(),
});

const createMediaSchema = z.object({
  uploaderId: z.number().int().positive(),
  url: z.string().min(1),
  type: z.enum(['IMAGE', 'VIDEO']),
  caption: z.string().optional(),
  taggedUserIds: z.array(z.number().int().positive()).default([]),
});

const commentSchema = z.object({
  authorId: z.number().int().positive(),
  body: z.string().min(1),
});

const includeAlbum = {
  createdBy: true,
  event: true,
  media: {
    include: {
      uploader: true,
      comments: { include: { author: true } },
    },
    orderBy: { createdAt: 'desc' },
  },
};

export const galleryRouter = Router();

galleryRouter.get(
  '/albums',
  asyncHandler(async (req, res) => {
    const eventId = req.query.eventId ? Number(req.query.eventId) : undefined;

    const albums = await prisma.album.findMany({
      where: {
        ...(eventId ? { eventId } : {}),
      },
      include: includeAlbum,
      orderBy: { createdAt: 'desc' },
    });

    res.json(albums);
  }),
);

galleryRouter.post(
  '/albums',
  asyncHandler(async (req, res) => {
    const payload = createAlbumSchema.parse(req.body);

    const album = await prisma.album.create({
      data: {
        title: payload.title,
        description: payload.description,
        eventId: payload.eventId,
        createdById: payload.createdById,
        coverImage: payload.coverImage,
      },
      include: includeAlbum,
    });

    res.status(201).json(album);
  }),
);

galleryRouter.get(
  '/albums/:id',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const album = await prisma.album.findUnique({
      where: { id },
      include: includeAlbum,
    });

    if (!album) {
      return res.status(404).json({ error: 'NotFound', message: 'Album not found' });
    }

    res.json(album);
  }),
);

galleryRouter.post(
  '/albums/:id/media',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const payload = createMediaSchema.parse(req.body);

    const media = await prisma.mediaItem.create({
      data: {
        albumId: id,
        uploaderId: payload.uploaderId,
        url: payload.url,
        type: payload.type,
        caption: payload.caption,
        taggedUserIds: payload.taggedUserIds,
      },
      include: {
        uploader: true,
        comments: { include: { author: true } },
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: payload.uploaderId,
        type: 'MEDIA_UPLOADED',
        points: 6,
        metadata: { albumId: id },
      },
    });

    res.status(201).json(media);
  }),
);

galleryRouter.post(
  '/media/:id/comments',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const payload = commentSchema.parse(req.body);

    const comment = await prisma.mediaComment.create({
      data: {
        mediaId: id,
        authorId: payload.authorId,
        body: payload.body,
      },
      include: { author: true },
    });

    res.status(201).json(comment);
  }),
);
