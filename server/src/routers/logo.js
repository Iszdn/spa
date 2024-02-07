import { Router } from 'express'
import { createLogo, deleteLogo, getByIdLogo, getLogo, updateLogo } from '../controllers/logo.js'
const router = Router()


router.get("/",getLogo)
router.get("/:id", getByIdLogo)
router.post("/", createLogo)
router.delete("/:id", deleteLogo)
router.put("/:id", updateLogo)

export default router