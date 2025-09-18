import { Router } from 'express';
import { z } from 'zod';

import { prisma } from '../../db/client';
import { asyncHandler } from '../../utils/asyncHandler';

const createThreadSchema = z.object({
  title: z.string().optional(),
  type: z.enum(['DIRECT', 'GROUP', 'EVENT']),
  createdById: z.number().int().positive(),
  participantIds: z.array(z.number().int().positive()).min(1),
  eventId: z.number().int().positive().optional(),
});

const sendMessageSchema = z.object({
  senderId: z.number().int().positive(),
  body: z.string().optional(),
  attachments: z.any().optional(),
  voiceNoteUrl: z.string().url().optional(),
}).refine((payload) => payload.body || payload.voiceNoteUrl || payload.attachments, {
  message: 'Message must include text, voice note, or attachments',
});

const reactionSchema = z.object({
  userId: z.number().int().positive(),
  emoji: z.string().min(1),
});

const includeThread = {
  participants: { include: { user: true } },
  messages: {
    include: {
      sender: true,
      reactions: { include: { user: true } },
    },
    orderBy: { createdAt: 'asc' },
  },
  createdBy: true,
  event: true,
};

export const chatsRouter = Router();

chatsRouter.get(
  '/threads',
  asyncHandler(async (req, res) => {
    const userId = req.query.userId ? Number(req.query.userId) : undefined;

    const threads = await prisma.chatThread.findMany({
      where: {
        ...(userId
          ? {
              participants: {
                some: { userId },
              },
            }
          : {}),
      },
      include: includeThread,
      orderBy: { createdAt: 'desc' },
    });

    res.json(threads);
  }),
);

chatsRouter.post(
  '/threads',
  asyncHandler(async (req, res) => {
    const payload = createThreadSchema.parse(req.body);
    const participantIds = Array.from(new Set([...payload.participantIds, payload.createdById]));

    if (payload.type === 'DIRECT' && participantIds.length !== 2) {
      return res.status(400).json({ error: 'InvalidParticipants', message: 'Direct chats require exactly two participants' });
    }

    if (payload.type === 'EVENT' && !payload.eventId) {
      return res.status(400).json({ error: 'MissingEvent', message: 'Event chats require an eventId' });
    }

    const thread = await prisma.chatThread.create({
      data: {
        title: payload.title,
        type: payload.type,
        createdById: payload.createdById,
        eventId: payload.eventId,
        participants: {
          create: participantIds.map((userId) => ({
            userId,
            role: userId === payload.createdById ? 'ADMIN' : 'MEMBER',
          })),
        },
      },
      include: includeThread,
    });

    res.status(201).json(thread);
  }),
);

chatsRouter.get(
  '/threads/:id',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const thread = await prisma.chatThread.findUnique({
      where: { id },
      include: includeThread,
    });

    if (!thread) {
      return res.status(404).json({ error: 'NotFound', message: 'Thread not found' });
    }

    res.json(thread);
  }),
);

chatsRouter.post(
  '/threads/:id/messages',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const payload = sendMessageSchema.parse(req.body);

    const message = await prisma.message.create({
      data: {
        threadId: id,
        senderId: payload.senderId,
        body: payload.body,
        attachments: payload.attachments ?? null,
        voiceNoteUrl: payload.voiceNoteUrl,
      },
      include: {
        sender: true,
        reactions: { include: { user: true } },
      },
    });

    res.status(201).json(message);
  }),
);

chatsRouter.post(
  '/threads/:id/messages/:messageId/reactions',
  asyncHandler(async (req, res) => {
    const messageId = Number(req.params.messageId);
    const payload = reactionSchema.parse(req.body);

    const existing = await prisma.messageReaction.findFirst({
      where: { messageId, userId: payload.userId, emoji: payload.emoji },
    });

    if (existing) {
      await prisma.messageReaction.delete({ where: { id: existing.id } });
      return res.status(204).send();
    }

    const reaction = await prisma.messageReaction.create({
      data: {
        messageId,
        userId: payload.userId,
        emoji: payload.emoji,
      },
      include: { user: true },
    });

    res.status(201).json(reaction);
  }),
);
