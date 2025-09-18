import { Router } from 'express';
import { z } from 'zod';

import { prisma } from '../../db/client';
import { asyncHandler } from '../../utils/asyncHandler';

const updateProfileSchema = z.object({
  fullName: z.string().min(3).optional(),
  avatarUrl: z.string().url().optional(),
  batchYear: z.number().int().optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
  socialLinks: z.record(z.string()).optional(),
  privacySettings: z.record(z.any()).optional(),
});

export const profilesRouter = Router();

profilesRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const query = typeof req.query.q === 'string' ? req.query.q : undefined;
    const batchYear = req.query.batchYear ? Number(req.query.batchYear) : undefined;

    const users = await prisma.user.findMany({
      where: {
        ...(query
          ? {
              OR: [
                { fullName: { contains: query, mode: 'insensitive' } },
                { location: { contains: query, mode: 'insensitive' } },
              ],
            }
          : {}),
        ...(batchYear ? { batchYear } : {}),
      },
      orderBy: { fullName: 'asc' },
      select: {
        id: true,
        fullName: true,
        avatarUrl: true,
        batchYear: true,
        location: true,
        bio: true,
        socialLinks: true,
      },
    });

    res.json(users);
  }),
);

profilesRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        badges: { include: { badge: true } },
        notificationPref: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'NotFound', message: 'User not found' });
    }

    res.json(user);
  }),
);

profilesRouter.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const payload = updateProfileSchema.parse(req.body);

    const user = await prisma.user.update({
      where: { id },
      data: payload,
      include: {
        badges: { include: { badge: true } },
        notificationPref: true,
      },
    });

    res.json(user);
  }),
);

profilesRouter.get(
  '/:id/activity',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const activity = await prisma.activityLog.findMany({
      where: { userId: id },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    res.json(activity);
  }),
);
