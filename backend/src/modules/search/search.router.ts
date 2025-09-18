import { Router } from 'express';

import { prisma } from '../../db/client';
import { asyncHandler } from '../../utils/asyncHandler';

export const searchRouter = Router();

searchRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const query = typeof req.query.q === 'string' ? req.query.q : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : 5;

    if (!query) {
      return res.json({ posts: [], events: [], people: [], media: [], resources: [] });
    }

    const [posts, events, people, media, resources] = await Promise.all([
      prisma.post.findMany({
        where: { content: { contains: query, mode: 'insensitive' } },
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { author: true },
      }),
      prisma.event.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { tags: { has: query } },
          ],
        },
        take: limit,
        orderBy: { startAt: 'asc' },
      }),
      prisma.user.findMany({
        where: {
          OR: [
            { fullName: { contains: query, mode: 'insensitive' } },
            { location: { contains: query, mode: 'insensitive' } },
            { bio: { contains: query, mode: 'insensitive' } },
          ],
        },
        take: limit,
        select: { id: true, fullName: true, avatarUrl: true, batchYear: true, location: true },
      }),
      prisma.mediaItem.findMany({
        where: {
          OR: [
            { caption: { contains: query, mode: 'insensitive' } },
            { album: { title: { contains: query, mode: 'insensitive' } } },
          ],
        },
        include: { album: true, uploader: true },
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.resource.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { tags: { has: query } },
          ],
        },
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    res.json({ posts, events, people, media, resources });
  }),
);
