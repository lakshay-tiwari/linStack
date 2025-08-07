"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controller/post.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const router = (0, express_1.Router)();
// POST /api/posts - create a new post
router.post('/create', verifyToken_1.verifyToken, post_controller_1.createPost);
//GET /api/posts - get all post
router.get('/', verifyToken_1.verifyToken, post_controller_1.getAllPosts);
// POST /api/posts/:postId/like - like a post
router.post('/:postId/like', verifyToken_1.verifyToken, post_controller_1.likePost);
// POST /api/posts/:postId/comment - comment on a post
router.post('/:postId/comment', verifyToken_1.verifyToken, post_controller_1.commentOnPost);
exports.default = router;
