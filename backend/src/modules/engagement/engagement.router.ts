import { Router } from 'express';

import { prisma } from '../../db/client';
import { asyncHandler } from '../../utils/asyncHandler';

const triviaBank = [
  {
    question: 'Which year did our school auditorium open its doors?',
    options: ['1998', '2002', '2005', '2010'],
    answer: '2002',
  },
  {
    question: 'Who was the longest-serving principal during our school years?',
    options: ['Mr. Rahman', 'Ms. Banerjee', 'Mr. Chatterjee', 'Ms. Ahmed'],
    answer: 'Ms. Ahmed',
  },
  {
    question: 'What was the theme of our 2012 cultural fest?',
    options: ['Carnival of Memories', 'Back to the 90s', 'Colours of Bengal', 'Stars of Tomorrow'],
    answer: 'Back to the 90s',
  },
];

export const engagementRouter = Router();

engagementRouter.get(
  '/throwback',
  asyncHandler(async (_req, res) => {
    const media = await prisma.mediaItem.findFirst({
      orderBy: { createdAt: 'asc' },
      include: { album: true, uploader: true },
    });

    const post = await prisma.post.findFirst({
      orderBy: { createdAt: 'asc' },
      include: { author: true },
    });

    res.json({ media, post });
  }),
);

engagementRouter.get(
  '/trivia',
  asyncHandler(async (_req, res) => {
    const trivia = triviaBank[Math.floor(Math.random() * triviaBank.length)];
    res.json(trivia);
  }),
);

engagementRouter.get(
  '/challenges',
  asyncHandler(async (_req, res) => {
    const polls = await prisma.poll.findMany({
      where: { closesAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { options: true },
    });

    res.json({ polls });
  }),
);
