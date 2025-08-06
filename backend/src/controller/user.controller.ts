import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export const getUserProfile = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.user?.id; // From verifyToken middleware

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        bio: true,
        email: true,
        createdAt: true,
        posts: {
          orderBy: { createdAt: "desc" },
          include: {
            author: { select: { id: true, username: true } },
            comments: {
              include: { author: { select: { id: true, username: true } } }
            },
            likes: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Mock followers/following counts for now
    const mockFollowersCount = 120;
    const mockFollowingCount = 75;

    res.json({
      ...user,
      followers: Array(mockFollowersCount).fill(null),
      following: Array(mockFollowingCount).fill(null),
      joinedAt: user.createdAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get user profile" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = (req.user as { id: string }).id
  const { username, bio } = req.body

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        bio,
      },
    })

    res.json({ message: 'Profile updated', user: updatedUser })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' })
  }
}

export const followUser = async (req: Request, res: Response) => {
  //@ts-ignore
  const followerId = (req.user as { id: string }).id
  const { userId: followingId } = req.body

  try {
    if (followerId === followingId) {
      return res.status(400).json({ error: 'You cannot follow yourself' })
    }

    await prisma.follow.create({
      data: { followerId, followingId },
    })

    res.json({ message: 'Followed' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to follow user' })
  }
}