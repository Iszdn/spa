import { Router } from 'express'
import { createFaq, deleteFaq, getFaq, getByIdFaq, updateFaq } from '../controllers/faq.js'
const router = Router()


router.get("/",getFaq)
router.get("/:id", getByIdFaq)
router.post("/", createFaq)
router.delete("/:id", deleteFaq)
router.put("/:id", updateFaq)

export default router