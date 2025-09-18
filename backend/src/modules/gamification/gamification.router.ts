import { Router } from 'express';
import { subDays } from 'date-fns';
import { z } from 'zod';

import { prisma } from '../../db/client';
import { asyncHandler } from '../../utils/asyncHandler';

const awardBadgeSchema = z.object({
  userId: z.number().int().positive(),
  badgeCode: z.string().min(1),
  note: z.string().optional(),
});

export const gamificationRouter = Router();

gamificationRouter.get(
  '/leaderboard',
  asyncHandler(async (req, res) => {
    const periodDays = req.query.days ? Number(req.query.days) : 30;
    const since = subDays(new Date(), periodDays);

    const entries = (await prisma.activityLog.groupBy({
      by: ['userId'],
      where: { createdAt: { gte: since } },
      _sum: { points: true },
      orderBy: { _sum: { points: 'desc' } },
      take: 20,
    })) as Array<{ userId: number; _sum: { points: number | null } }>;

    const users = (await prisma.user.findMany({
      where: { id: { in: entries.map((entry) => entry.userId) } },
      select: { id: true, fullName: true, avatarUrl: true },
    })) as Array<{ id: number; fullName: string; avatarUrl: string | null }>;

    const leaderboard = entries.map((entry) => ({
      user: users.find((user) => user.id === entry.userId) ?? null,
      points: entry._sum.points ?? 0,
    }));

    res.json(leaderboard);
  }),
);

gamificationRouter.get(
  '/badges',
  asyncHandler(async (_req, res) => {
    const badges = await prisma.badge.findMany({
      include: { userBadges: true },
      orderBy: { points: 'desc' },
    });

    res.json(badges);
  }),
);

gamificationRouter.post(
  '/badges/award',
  asyncHandler(async (req, res) => {
    const payload = awardBadgeSchema.parse(req.body);

    const badge = await prisma.badge.findUnique({ where: { code: payload.badgeCode } });
    if (!badge) {
      return res.status(404).json({ error: 'NotFound', message: 'Badge not found' });
    }

    const userBadge = await prisma.userBadge.create({
      data: {
        userId: payload.userId,
        badgeId: badge.id,
        note: payload.note,
      },
      include: { badge: true },
    });

    await prisma.activityLog.create({
      data: {
        userId: payload.userId,
        type: 'BADGE_EARNED',
        points: badge.points,
        metadata: { badgeCode: badge.code },
      },
    });

    res.status(201).json(userBadge);
  }),
);

gamificationRouter.get(
  '/activity',
  asyncHandler(async (_req, res) => {
    const activity = await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, fullName: true, avatarUrl: true } } },
      take: 50,
    });

    res.json(activity);
  }),
);
