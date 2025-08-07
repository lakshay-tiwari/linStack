"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const router = (0, express_1.Router)();
// Sign up a new user
router.post('/signup', auth_controller_1.signUp);
// Sign in a user
router.post('/signin', auth_controller_1.signIn);
// Sign out the current user
router.get('/signout', verifyToken_1.verifyToken, auth_controller_1.signOut);
// Get the currently authenticated user's data
router.get('/me', verifyToken_1.verifyToken, auth_controller_1.getMe);
exports.default = router;
