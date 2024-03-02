
import { Router } from 'express'
import { authUser, deleteUser, getAllUsers, getUserById, getUserProfile, logoutUser, registerUser, updateUser, updateUserProfile, verifyEmail } from '../controllers/user.js'
import { protect } from '../middleware/authMiddleware.js'
const router = Router()


router.get("/all",getAllUsers)
router.post("/verify",verifyEmail)
router.get("/:id",getUserById)
router.delete("/:id",deleteUser)
router.put("/:id",updateUser)
router.post("/",registerUser)
router.post("/auth",authUser)
router.post("/logout",logoutUser)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)



export default router