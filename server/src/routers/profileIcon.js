import { Router } from 'express'
import { createProfileIcon, deleteProfileIcon, getByIdProfileIcon, getProfileIcon, updateProfileIcon } from '../controllers/profileIcon.js'
const router = Router()


router.get("/",getProfileIcon)
router.get("/:id", getByIdProfileIcon)
router.post("/", createProfileIcon)
router.delete("/:id", deleteProfileIcon)
router.put("/:id", updateProfileIcon)

export default router