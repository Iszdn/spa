import { Router } from 'express'
import { getByIdHeartIcon, getHeartIcon,createHeartIcon,deleteHeartIcon,updateHeartIcon } from '../controllers/heartIcon.js'
const router = Router()


router.get("/",getHeartIcon)
router.get("/:id", getByIdHeartIcon)
router.post("/", createHeartIcon)
router.delete("/:id", deleteHeartIcon)
router.put("/:id", updateHeartIcon)

export default router