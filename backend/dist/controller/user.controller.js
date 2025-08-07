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
exports.followUser = exports.updateProfile = exports.getUserProfile = void 0;
const prisma_1 = require("../lib/prisma");
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //@ts-ignore
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // From verifyToken middleware
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const user = yield prisma_1.prisma.user.findUnique({
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
        res.json(Object.assign(Object.assign({}, user), { followers: Array(mockFollowersCount).fill(null), following: Array(mockFollowingCount).fill(null), joinedAt: user.createdAt }));
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get user profile" });
    }
});
exports.getUserProfile = getUserProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.user.id;
    const { username, bio } = req.body;
    try {
        const updatedUser = yield prisma_1.prisma.user.update({
            where: { id: userId },
            data: {
                username,
                bio,
            },
        });
        res.json({ message: 'Profile updated', user: updatedUser });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
});
exports.updateProfile = updateProfile;
const followUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const followerId = req.user.id;
    const { userId: followingId } = req.body;
    try {
        if (followerId === followingId) {
            return res.status(400).json({ error: 'You cannot follow yourself' });
        }
        yield prisma_1.prisma.follow.create({
            data: { followerId, followingId },
        });
        res.json({ message: 'Followed' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to follow user' });
    }
});
exports.followUser = followUser;
