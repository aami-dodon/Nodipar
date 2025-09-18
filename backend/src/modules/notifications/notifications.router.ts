import { Router } from 'express';
import { z } from 'zod';

import { prisma } from '../../db/client';
import { asyncHandler } from '../../utils/asyncHandler';

const markSchema = z.object({
  read: z.boolean().default(true),
});

const preferenceSchema = z.object({
  emailDigestFrequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'NEVER']).optional(),
  pushEnabled: z.boolean().optional(),
  emailEnabled: z.boolean().optional(),
  quietStart: z.number().int().min(0).max(1439).nullable().optional(),
  quietEnd: z.number().int().min(0).max(1439).nullable().optional(),
  categories: z.record(z.boolean()).optional(),
});

const createNotificationSchema = z.object({
  userId: z.number().int().positive(),
  category: z.enum(['POST', 'EVENT', 'CHAT', 'BIRTHDAY', 'BADGE', 'RESOURCE', 'ANNOUNCEMENT']),
  payload: z.record(z.any()),
});

export const notificationsRouter = Router();

notificationsRouter.get(
  '/:userId',
  asyncHandler(async (req, res) => {
    const userId = Number(req.params.userId);
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json(notifications);
  }),
);

notificationsRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const payload = createNotificationSchema.parse(req.body);

    const notification = await prisma.notification.create({
      data: payload,
    });

    res.status(201).json(notification);
  }),
);

notificationsRouter.patch(
  '/:notificationId/read',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.notificationId);
    const { read } = markSchema.parse(req.body);

    const notification = await prisma.notification.update({
      where: { id },
      data: { readAt: read ? new Date() : null },
    });

    res.json(notification);
  }),
);

notificationsRouter.get(
  '/:userId/preferences',
  asyncHandler(async (req, res) => {
    const userId = Number(req.params.userId);
    const prefs = await prisma.notificationPreference.findUnique({ where: { userId } });
    res.json(prefs);
  }),
);

notificationsRouter.patch(
  '/:userId/preferences',
  asyncHandler(async (req, res) => {
    const userId = Number(req.params.userId);
    const payload = preferenceSchema.parse(req.body);

    const prefs = await prisma.notificationPreference.upsert({
      where: { userId },
      create: {
        userId,
        emailDigestFrequency: payload.emailDigestFrequency ?? 'WEEKLY',
        pushEnabled: payload.pushEnabled ?? true,
        emailEnabled: payload.emailEnabled ?? true,
        quietStart: payload.quietStart ?? null,
        quietEnd: payload.quietEnd ?? null,
        categories: payload.categories ?? {},
      },
      update: {
        ...payload,
      },
    });

    res.json(prefs);
  }),
);
