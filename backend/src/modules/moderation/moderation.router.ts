import { Router } from 'express';
import { z } from 'zod';

import { prisma } from '../../db/client';
import { asyncHandler } from '../../utils/asyncHandler';

const createReportSchema = z.object({
  reporterId: z.number().int().positive(),
  targetType: z.enum(['POST', 'COMMENT', 'MESSAGE', 'MEDIA', 'USER']),
  targetId: z.number().int().positive(),
  reason: z.string().min(3),
  details: z.string().optional(),
});

const resolveSchema = z.object({
  status: z.enum(['IN_REVIEW', 'RESOLVED', 'DISMISSED']),
  resolvedById: z.number().int().positive(),
});

export const moderationRouter = Router();

moderationRouter.post(
  '/reports',
  asyncHandler(async (req, res) => {
    const payload = createReportSchema.parse(req.body);

    const report = await prisma.report.create({
      data: payload,
    });

    res.status(201).json(report);
  }),
);

moderationRouter.get(
  '/reports',
  asyncHandler(async (req, res) => {
    const status = typeof req.query.status === 'string' ? req.query.status : undefined;

    const reports = await prisma.report.findMany({
      where: {
        ...(status ? { status } : {}),
      },
      orderBy: { createdAt: 'desc' },
      include: {
        reporter: { select: { id: true, fullName: true } },
        resolvedBy: { select: { id: true, fullName: true } },
      },
    });

    res.json(reports);
  }),
);

moderationRouter.patch(
  '/reports/:id',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const payload = resolveSchema.parse(req.body);

    const report = await prisma.report.update({
      where: { id },
      data: {
        status: payload.status,
        resolvedById: payload.resolvedById,
        resolvedAt: new Date(),
      },
      include: {
        reporter: { select: { id: true, fullName: true } },
        resolvedBy: { select: { id: true, fullName: true } },
      },
    });

    res.json(report);
  }),
);
