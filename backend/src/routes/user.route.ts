import express from 'express'
import { updateProfile, getUser, followUser } from '../controller/user.controller'
import { verifyToken } from '../middleware/verifyToken'

const router = express.Router()

router.post('/update-profile', verifyToken, updateProfile)
router.post('/get-user', getUser)
router.post('/follow-user', verifyToken, followUser)

export default router;
