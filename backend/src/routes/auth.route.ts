import { Router } from 'express';
import {
  signUp,
  signIn,
  signOut,
  getMe,
} from '../controller/auth.controller';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

// Sign up a new user
router.post('/signup', signUp);

// Sign in a user
router.post('/signin', signIn);

// Sign out the current user
router.get('/signout', verifyToken, signOut);

// Get the currently authenticated user's data
router.get('/me', verifyToken, getMe);

export default router;
