import { Router } from 'express'
import { createInsta, deleteInsta, getByIdInsta, getInsta, updateInsta } from '../controllers/insta.js'
const router = Router()


router.get("/",getInsta)
router.get("/:id", getByIdInsta)
router.post("/", createInsta)
router.delete("/:id", deleteInsta)
router.put("/:id", updateInsta)

export default router