import { Router } from 'express'
import { createContact, deleteContact, getContact, getByIdContact, updateContact } from '../controllers/contact.js'
const router = Router()


router.get("/",getContact)
router.get("/:id", getByIdContact)
router.post("/", createContact)
router.delete("/:id", deleteContact)
router.put("/:id", updateContact)

export default router