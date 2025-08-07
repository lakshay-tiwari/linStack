"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const router = express_1.default.Router();
router.post('/update-profile', verifyToken_1.verifyToken, user_controller_1.updateProfile);
router.get('/get-profile', verifyToken_1.verifyToken, user_controller_1.getUserProfile);
router.post('/follow-user', verifyToken_1.verifyToken, user_controller_1.followUser);
exports.default = router;
