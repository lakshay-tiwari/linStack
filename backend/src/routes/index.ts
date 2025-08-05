import { Router } from 'express';
import authRoutes from './auth.route'
import userRoutes from './user.route';
import postRoutes from './post.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

export default router;
