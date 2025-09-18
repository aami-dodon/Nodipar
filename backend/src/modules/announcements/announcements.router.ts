import { Router } from 'express';
import { z } from 'zod';

import { prisma } from '../../db/client';
import { asyncHandler } from '../../utils/asyncHandler';

const announcementSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(5),
  createdById: z.number().int().positive(),
  scheduledFor: z.string().datetime().optional(),
  publishNow: z.boolean().default(false),
});

const publishSchema = z.object({
  isPublished: z.boolean(),
});

export const announcementsRouter = Router();

announcementsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const status = typeof req.query.status === 'string' ? req.query.status : undefined;

    const announcements = await prisma.announcement.findMany({
      where: {
        ...(status === 'published' ? { isPublished: true } : {}),
        ...(status === 'scheduled' ? { isPublished: false } : {}),
      },
      include: { createdBy: true },
      orderBy: { scheduledFor: 'asc' },
    });

    res.json(announcements);
  }),
);

announcementsRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const payload = announcementSchema.parse(req.body);

    const announcement = await prisma.announcement.create({
      data: {
        title: payload.title,
        body: payload.body,
        createdById: payload.createdById,
        scheduledFor: payload.scheduledFor ? new Date(payload.scheduledFor) : null,
        isPublished: payload.publishNow,
      },
      include: { createdBy: true },
    });

    res.status(201).json(announcement);
  }),
);

announcementsRouter.patch(
  '/:id/publish',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const { isPublished } = publishSchema.parse(req.body);

    const announcement = await prisma.announcement.update({
      where: { id },
      data: { isPublished },
      include: { createdBy: true },
    });

    res.json(announcement);
  }),
);
