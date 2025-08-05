import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.body
  if (!id){
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        bio: true,
        email: true,
      },
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (err) {
    res.status(500).json({ error: 'Failed to get user' })
  }
}


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