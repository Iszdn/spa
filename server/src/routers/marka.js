import { Router } from 'express'
import { createMarka, deleteMarka, getByIdMarka, getMarka, updateMarka } from '../controllers/marka.js'
const router = Router()


router.get("/",getMarka)
router.get("/:id", getByIdMarka)
router.post("/", createMarka)
router.delete("/:id", deleteMarka)
router.put("/:id", updateMarka)

export default router