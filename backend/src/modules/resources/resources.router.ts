import { Router } from 'express';
import { z } from 'zod';

import { prisma } from '../../db/client';
import { asyncHandler } from '../../utils/asyncHandler';

const resourceSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  type: z.enum(['DOCUMENT', 'IMAGE', 'VIDEO', 'AUDIO', 'LINK']),
  url: z.string().url(),
  uploadedById: z.number().int().positive(),
  tags: z.array(z.string().min(1)).default([]),
});

export const resourcesRouter = Router();

resourcesRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const tag = typeof req.query.tag === 'string' ? req.query.tag : undefined;

    const resources = await prisma.resource.findMany({
      where: {
        ...(tag ? { tags: { has: tag } } : {}),
      },
      orderBy: { createdAt: 'desc' },
      include: { uploadedBy: { select: { id: true, fullName: true } } },
    });

    res.json(resources);
  }),
);

resourcesRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const payload = resourceSchema.parse(req.body);

    const resource = await prisma.resource.create({
      data: payload,
      include: { uploadedBy: { select: { id: true, fullName: true } } },
    });

    res.status(201).json(resource);
  }),
);

resourcesRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const resource = await prisma.resource.findUnique({
      where: { id },
      include: { uploadedBy: { select: { id: true, fullName: true } } },
    });

    if (!resource) {
      return res.status(404).json({ error: 'NotFound', message: 'Resource not found' });
    }

    res.json(resource);
  }),
);

resourcesRouter.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const payload = resourceSchema.partial().parse(req.body);

    const resource = await prisma.resource.update({
      where: { id },
      data: payload,
      include: { uploadedBy: { select: { id: true, fullName: true } } },
    });

    res.json(resource);
  }),
);
