import { Router } from 'express';
import { subHours } from 'date-fns';
import { z } from 'zod';

import { prisma } from '../../db/client';
import { asyncHandler } from '../../utils/asyncHandler';

const createEventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  location: z.string().optional(),
  coverImage: z.string().url().optional(),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  tags: z.array(z.string().min(1)).default([]),
  createdById: z.number().int().positive(),
});

const rsvpSchema = z.object({
  userId: z.number().int().positive(),
  status: z.enum(['GOING', 'INTERESTED', 'NOT_GOING']),
});

const messageSchema = z.object({
  authorId: z.number().int().positive(),
  body: z.string().min(1),
});

const pollSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  isAnonymous: z.boolean().default(false),
  closesAt: z.string().datetime().optional(),
  options: z.array(z.string().min(1)).min(2),
  createdById: z.number().int().positive(),
});

const voteSchema = z.object({
  userId: z.number().int().positive(),
  optionId: z.number().int().positive(),
});

const includeEvent = {
  createdBy: true,
  rsvps: { include: { user: true } },
  polls: {
    include: {
      options: {
        include: { votes: true },
      },
      votes: true,
      createdBy: true,
    },
  },
  albums: {
    include: {
      media: {
        include: { uploader: true },
      },
    },
  },
  chatThreads: true,
};

export const eventsRouter = Router();

eventsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const status = typeof req.query.status === 'string' ? req.query.status : undefined;
    const now = new Date();

    const events = await prisma.event.findMany({
      where: {
        ...(status === 'upcoming'
          ? { startAt: { gte: subHours(now, 1) }, isArchived: false }
          : {}),
        ...(status === 'past'
          ? { endAt: { lt: now } }
          : {}),
      },
      include: includeEvent,
      orderBy: { startAt: 'asc' },
    });

    res.json(events);
  }),
);

eventsRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const payload = createEventSchema.parse(req.body);

    const event = await prisma.event.create({
      data: {
        title: payload.title,
        description: payload.description,
        location: payload.location,
        coverImage: payload.coverImage,
        startAt: new Date(payload.startAt),
        endAt: new Date(payload.endAt),
        tags: payload.tags,
        createdById: payload.createdById,
      },
      include: includeEvent,
    });

    await prisma.chatThread.create({
      data: {
        title: `${event.title} RSVP chat`,
        type: 'EVENT',
        createdById: payload.createdById,
        eventId: event.id,
        participants: {
          create: [{ userId: payload.createdById, role: 'ADMIN' }],
        },
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: payload.createdById,
        type: 'EVENT_CREATED',
        points: 10,
        metadata: { eventId: event.id },
      },
    });

    res.status(201).json(event);
  }),
);

eventsRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        ...includeEvent,
        rsvps: { include: { user: true } },
        messages: { include: { author: true }, orderBy: { createdAt: 'asc' } },
      },
    });

    if (!event) {
      return res.status(404).json({ error: 'NotFound', message: 'Event not found' });
    }

    res.json(event);
  }),
);

eventsRouter.post(
  '/:id/rsvps',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const payload = rsvpSchema.parse(req.body);

    const rsvp = await prisma.eventRsvp.upsert({
      where: {
        eventId_userId: { eventId: id, userId: payload.userId },
      },
      create: {
        eventId: id,
        userId: payload.userId,
        status: payload.status,
      },
      update: {
        status: payload.status,
        respondedAt: new Date(),
      },
      include: { user: true },
    });

    await prisma.activityLog.create({
      data: {
        userId: payload.userId,
        type: 'RSVP_UPDATED',
        points: payload.status === 'GOING' ? 4 : 2,
        metadata: { eventId: id, status: payload.status },
      },
    });

    res.json(rsvp);
  }),
);

eventsRouter.get(
  '/:id/rsvps',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const rsvps = await prisma.eventRsvp.findMany({
      where: { eventId: id },
      include: { user: true },
      orderBy: { respondedAt: 'desc' },
    });
    res.json(rsvps);
  }),
);

eventsRouter.post(
  '/:id/discussion',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const payload = messageSchema.parse(req.body);

    const message = await prisma.eventMessage.create({
      data: {
        eventId: id,
        authorId: payload.authorId,
        body: payload.body,
      },
      include: { author: true },
    });

    res.status(201).json(message);
  }),
);

eventsRouter.get(
  '/:id/discussion',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const messages = await prisma.eventMessage.findMany({
      where: { eventId: id },
      include: { author: true },
      orderBy: { createdAt: 'asc' },
    });

    res.json(messages);
  }),
);

eventsRouter.post(
  '/:id/polls',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const payload = pollSchema.parse(req.body);

    const poll = await prisma.poll.create({
      data: {
        title: payload.title,
        description: payload.description,
        isAnonymous: payload.isAnonymous,
        closesAt: payload.closesAt ? new Date(payload.closesAt) : null,
        createdById: payload.createdById,
        eventId: id,
        options: {
          create: payload.options.map((option) => ({ label: option })),
        },
      },
      include: {
        createdBy: true,
        options: { include: { votes: true } },
        votes: true,
      },
    });

    res.status(201).json(poll);
  }),
);

eventsRouter.post(
  '/:id/polls/:pollId/vote',
  asyncHandler(async (req, res) => {
    const pollId = Number(req.params.pollId);
    const payload = voteSchema.parse(req.body);

    const poll = await prisma.poll.findUnique({
      where: { id: pollId },
      include: { options: true },
    });

    if (!poll || poll.eventId !== Number(req.params.id)) {
      return res.status(404).json({ error: 'NotFound', message: 'Poll not found for this event' });
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
        metadata: { pollId, optionId: payload.optionId },
      },
    });

    res.status(201).json(vote);
  }),
);
