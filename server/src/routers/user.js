
import { Router } from 'express'
import { authUser, getUserProfile, logoutUser, registerUser, updateUserProfile } from '../controllers/user.js'
import { protect } from '../middleware/authMiddleware.js'
const router = Router()


router.post("/",registerUser)
router.post("/auth",authUser)
router.post("/logout",logoutUser)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)



export default router