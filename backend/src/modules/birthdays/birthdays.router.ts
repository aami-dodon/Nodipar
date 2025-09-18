import { Router } from 'express';
import { addYears, differenceInCalendarDays, setYear } from 'date-fns';
import { z } from 'zod';

import { prisma } from '../../db/client';
import { asyncHandler } from '../../utils/asyncHandler';

const greetingSchema = z.object({
  senderId: z.number().int().positive(),
  message: z.string().min(1),
});

export const birthdaysRouter = Router();

birthdaysRouter.get(
  '/upcoming',
  asyncHandler(async (req, res) => {
    const days = req.query.days ? Number(req.query.days) : 14;
    const today = new Date();

    const users = await prisma.user.findMany({
      where: { birthDate: { not: null } },
      select: { id: true, fullName: true, avatarUrl: true, birthDate: true },
    });

    type BirthdayUser = {
      id: number;
      fullName: string;
      avatarUrl: string | null;
      birthDate: Date | null;
    };

    type UpcomingBirthday = BirthdayUser & { nextBirthday: Date; daysUntil: number };

    const upcoming = (users as BirthdayUser[])
      .map((user): UpcomingBirthday => {
        const birthDate = user.birthDate as Date;
        let nextBirthday = setYear(birthDate, today.getFullYear());
        if (nextBirthday < today) {
          nextBirthday = addYears(nextBirthday, 1);
        }
        const daysUntil = differenceInCalendarDays(nextBirthday, today);
        return { ...user, nextBirthday, daysUntil };
      })
      .filter((entry) => entry.daysUntil <= days)
      .sort((a, b) => a.daysUntil - b.daysUntil);

    res.json(upcoming);
  }),
);

birthdaysRouter.post(
  '/:userId/greetings',
  asyncHandler(async (req, res) => {
    const userId = Number(req.params.userId);
    const payload = greetingSchema.parse(req.body);

    const notification = await prisma.notification.create({
      data: {
        userId,
        category: 'BIRTHDAY',
        payload: {
          senderId: payload.senderId,
          message: payload.message,
        },
      },
    });

    res.status(201).json(notification);
  }),
);
