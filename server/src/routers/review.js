import { Router } from 'express'
import { createReview, deleteReview, getReview, getByIdReview, updateReview } from '../controllers/review.js'
const router = Router()


router.get("/",getReview)
router.get("/:id", getByIdReview)
router.post("/", createReview)
router.delete("/:id", deleteReview)
router.put("/:id", updateReview)

export default router