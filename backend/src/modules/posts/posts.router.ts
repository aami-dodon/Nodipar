import { Router } from 'express';
import { z } from 'zod';

import { prisma } from '../../db/client';
import { asyncHandler } from '../../utils/asyncHandler';

const createPostSchema = z.object({
  authorId: z.number().int().positive(),
  content: z.string().min(1),
  mediaUrl: z.string().url().optional(),
  mediaType: z.enum(['image', 'video']).optional(),
  hashtags: z.array(z.string().min(1)).default([]),
  isPinned: z.boolean().optional(),
});

const commentSchema = z.object({
  authorId: z.number().int().positive(),
  body: z.string().min(1),
});

const reactionSchema = z.object({
  userId: z.number().int().positive(),
  type: z.string().min(1),
});

const pinSchema = z.object({
  isPinned: z.boolean(),
});

const includePost = {
  author: true,
  comments: {
    include: { author: true },
    orderBy: { createdAt: 'asc' },
  },
  reactions: true,
};

type PostWithRelations = NonNullable<Awaited<ReturnType<typeof prisma.post.findUnique>>>;

const mapPost = (post: PostWithRelations | null) => {
  if (!post) return null;
  const { reactions, comments, ...rest } = post as PostWithRelations & {
    reactions: Array<{ type: string }>;
    comments: Array<{ author: unknown }>;
  };
  const reactionSummary: Record<string, number> = {};
  reactions.forEach((reaction: { type: string }) => {
    reactionSummary[reaction.type] = (reactionSummary[reaction.type] ?? 0) + 1;
  });
  return {
    ...rest,
    author: post.author,
    comments: comments.map((comment: { author: unknown }) => ({
      ...comment,
      author: comment.author,
    })),
    reactionSummary,
    totalComments: comments.length,
    totalReactions: reactions.length,
  };
};

export const postsRouter = Router();

postsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const hashtag = typeof req.query.hashtag === 'string' ? req.query.hashtag : undefined;
    const authorId = req.query.authorId ? Number(req.query.authorId) : undefined;

    const posts = (await prisma.post.findMany({
      where: {
        ...(hashtag ? { hashtags: { has: hashtag } } : {}),
        ...(authorId ? { authorId } : {}),
      },
      include: includePost,
      orderBy: { createdAt: 'desc' },
    })) as PostWithRelations[];

    res.json(posts.map((post) => mapPost(post)));
  }),
);

postsRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const payload = createPostSchema.parse(req.body);

    const post = (await prisma.post.create({
      data: {
        authorId: payload.authorId,
        content: payload.content,
        mediaUrl: payload.mediaUrl,
        mediaType: payload.mediaType,
        hashtags: payload.hashtags,
        isPinned: payload.isPinned ?? false,
      },
      include: includePost,
    })) as PostWithRelations;

    await prisma.activityLog.create({
      data: {
        userId: payload.authorId,
        type: 'POST_CREATED',
        points: 5,
        metadata: { postId: post.id },
      },
    });

    res.status(201).json(mapPost(post));
  }),
);

postsRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const post = (await prisma.post.findUnique({
      where: { id },
      include: includePost,
    })) as PostWithRelations | null;

    if (!post) {
      return res.status(404).json({ error: 'NotFound', message: 'Post not found' });
    }

    res.json(mapPost(post));
  }),
);

postsRouter.post(
  '/:id/comments',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const payload = commentSchema.parse(req.body);

    const comment = await prisma.comment.create({
      data: {
        postId: id,
        authorId: payload.authorId,
        body: payload.body,
      },
      include: { author: true },
    });

    await prisma.activityLog.create({
      data: {
        userId: payload.authorId,
        type: 'COMMENT_CREATED',
        points: 2,
        metadata: { postId: id },
      },
    });

    res.status(201).json(comment);
  }),
);

postsRouter.get(
  '/:id/comments',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const comments = await prisma.comment.findMany({
      where: { postId: id },
      include: { author: true },
      orderBy: { createdAt: 'asc' },
    });
    res.json(comments);
  }),
);

postsRouter.post(
  '/:id/reactions',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const payload = reactionSchema.parse(req.body);

    const existing = await prisma.reaction.findFirst({
      where: { postId: id, userId: payload.userId, type: payload.type },
    });

    if (existing) {
      await prisma.reaction.delete({ where: { id: existing.id } });
      return res.status(204).send();
    }

    const reaction = await prisma.reaction.create({
      data: {
        postId: id,
        userId: payload.userId,
        type: payload.type,
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: payload.userId,
        type: 'REACTION_ADDED',
        points: 1,
        metadata: { postId: id, reaction: payload.type },
      },
    });

    res.status(201).json(reaction);
  }),
);

postsRouter.post(
  '/:id/pin',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const { isPinned } = pinSchema.parse(req.body);

    const post = (await prisma.post.update({
      where: { id },
      data: { isPinned },
      include: includePost,
    })) as PostWithRelations;

    res.json(mapPost(post));
  }),
);
