import { Request, Response } from 'express';
import { prisma } from '../lib/prisma'

// Create a new post
export const createPost = async (req: Request, res: Response) => {
  const { content } = req.body;
  const userId = (req.user as { id: string }).id;

  if (!content) return res.status(400).json({ error: 'Content is required' });

  const post = await prisma.post.create({
    data: {
      content,
      authorId:userId,
    },
  });

  res.status(201).json(post);
};

// Like a post
export const likePost = async (req: Request, res: Response) => {
  const userId = (req.user as { id: string }).id;
  const { postId } = req.params;

  const alreadyLiked = await prisma.like.findFirst({
    where: {
      userId,
      postId,
    },
  });

  if (alreadyLiked) {
    return res.status(400).json({ error: 'Post already liked' });
  }

  await prisma.like.create({
    data: {
      userId,
      postId,
    },
  });

  res.json({ message: 'Post liked' });
};

// Comment on a post
export const commentOnPost = async (req: Request, res: Response) => {
  const userId = (req.user as { id: string }).id;
  const { postId } = req.params;
  const { content } = req.body;

  if (!content) return res.status(400).json({ error: 'Comment text is required' });

  const comment = await prisma.comment.create({
    data: {
      content,
      authorId:userId,
      postId,
    },
  });

  res.status(201).json(comment);
};
