import { Router } from 'express';
import { z } from 'zod';

import { prisma } from '../../db/client';
import { asyncHandler } from '../../utils/asyncHandler';

const pollSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  isAnonymous: z.boolean().default(false),
  closesAt: z.string().datetime().optional(),
  options: z.array(z.string().min(1)).min(2),
  createdById: z.number().int().positive(),
  eventId: z.number().int().positive().optional(),
});

const voteSchema = z.object({
  userId: z.number().int().positive(),
  optionId: z.number().int().positive(),
});

const includePoll = {
  options: {
    include: { votes: true },
  },
  votes: {
    include: { user: true },
  },
  createdBy: true,
  event: true,
};

export const pollsRouter = Router();

pollsRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const polls = await prisma.poll.findMany({
      include: includePoll,
      orderBy: { createdAt: 'desc' },
      where: { eventId: null },
    });

    res.json(polls);
  }),
);

pollsRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const payload = pollSchema.parse(req.body);

    const poll = await prisma.poll.create({
      data: {
        title: payload.title,
        description: payload.description,
        isAnonymous: payload.isAnonymous,
        closesAt: payload.closesAt ? new Date(payload.closesAt) : null,
        createdById: payload.createdById,
        eventId: payload.eventId ?? null,
        options: {
          create: payload.options.map((option) => ({ label: option })),
        },
      },
      include: includePoll,
    });

    res.status(201).json(poll);
  }),
);

pollsRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const poll = await prisma.poll.findUnique({
      where: { id },
      include: includePoll,
    });

    if (!poll) {
      return res.status(404).json({ error: 'NotFound', message: 'Poll not found' });
    }

    res.json(poll);
  }),
);

pollsRouter.post(
  '/:id/vote',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const payload = voteSchema.parse(req.body);

    const poll = await prisma.poll.findUnique({
      where: { id },
      include: { options: true },
    });

    if (!poll) {
      return res.status(404).json({ error: 'NotFound', message: 'Poll not found' });
    }

    const optionExists = poll.options.some((option: { id: number }) => option.id === payload.optionId);
    if (!optionExists) {
      return res.status(400).json({ error: 'InvalidOption', message: 'Option does not belong to poll' });
    }

    const vote = await prisma.pollVote.create({
      data: {
        optionId: payload.optionId,
        userId: payload.userId,
      },
      include: {
        option: true,
        user: true,
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: payload.userId,
        type: 'POLL_VOTED',
        points: 3,
        metadata: { pollId: id, optionId: payload.optionId },
      },
    });

    res.status(201).json(vote);
  }),
);
