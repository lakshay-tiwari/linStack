"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = exports.commentOnPost = exports.likePost = exports.createPost = void 0;
const prisma_1 = require("../lib/prisma");
// Create a new post
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    //@ts-ignore
    const userId = req.user.id;
    if (!content)
        return res.status(400).json({ error: 'Content is required' });
    const post = yield prisma_1.prisma.post.create({
        data: { content, authorId: userId },
        include: {
            author: { select: { id: true, username: true } },
            comments: {
                include: { author: { select: { id: true, username: true } } }
            },
            likes: true
        }
    });
    res.status(201).json(post);
});
exports.createPost = createPost;
// Like a post
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.user.id;
    const { postId } = req.params;
    const alreadyLiked = yield prisma_1.prisma.like.findFirst({
        where: {
            userId,
            postId,
        },
    });
    if (alreadyLiked) {
        return res.status(400).json({ error: 'Post already liked' });
    }
    yield prisma_1.prisma.like.create({
        data: {
            userId,
            postId,
        },
    });
    res.json({ message: 'Post liked' });
});
exports.likePost = likePost;
// Comment on a post
const commentOnPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.user.id;
    const { postId } = req.params;
    const { content } = req.body;
    if (!content)
        return res.status(400).json({ error: 'Comment text is required' });
    const comment = yield prisma_1.prisma.comment.create({
        data: {
            content,
            authorId: userId,
            postId,
        },
    });
    res.status(201).json(comment);
});
exports.commentOnPost = commentOnPost;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma_1.prisma.post.findMany({
            orderBy: {
                createdAt: 'desc', // latest first
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
                comments: {
                    orderBy: { createdAt: 'asc' },
                    include: {
                        author: {
                            select: { id: true, username: true },
                        },
                    },
                },
                likes: true, // optional
            },
        });
        res.json({ posts });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});
exports.getAllPosts = getAllPosts;
