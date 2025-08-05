import { Router } from 'express';
import { createPost, likePost, commentOnPost } from '../controller/post.controller';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

// POST /api/posts - create a new post
router.post('/', verifyToken, createPost);

// POST /api/posts/:postId/like - like a post
router.post('/:postId/like', verifyToken, likePost);

// POST /api/posts/:postId/comment - comment on a post
router.post('/:postId/comment', verifyToken, commentOnPost);

export default router;
