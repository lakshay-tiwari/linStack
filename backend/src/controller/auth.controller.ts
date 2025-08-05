import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma' // adjust path if needed

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret' // secure this in env

// POST /signup
export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password , bio } : { username: string , email: string , password: string , bio?:string} = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return res.status(400).json({ error: 'Email already in use' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword , ...(bio && { bio }) },
    })

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' })

    res.cookie('token', token, { httpOnly: true , sameSite: 'strict'})
    res.json({ message: 'Signup successful' })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// POST /signin
export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password){ // if no email and password returns this
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' })

    res.cookie('token', token, { httpOnly: true })
    res.json({ message: 'Signin successful' })
  } catch (error) {
    console.error('Signin error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// POST /signout
export const signOut = (_req: Request, res: Response) => {
  try {
    res.clearCookie('token')
    res.json({ message: 'Signed out successfully' })
  } catch (error) {
    console.error('Signout error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// GET /me
export const getMe = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = (req.user as { id: string }).id

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      },
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    console.error('GetMe error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
