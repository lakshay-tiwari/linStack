import express from 'express'
import { updateProfile, getUserProfile, followUser } from '../controller/user.controller'
import { verifyToken } from '../middleware/verifyToken'

const router = express.Router()

router.post('/update-profile', verifyToken, updateProfile)
router.get('/get-profile',verifyToken, getUserProfile)
router.post('/follow-user', verifyToken, followUser)

export default router;
