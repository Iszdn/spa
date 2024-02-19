import { Router } from 'express'
import { createBooking, deleteBooking, getBooking, getByIdBooking, updateBooking } from '../controllers/booking.js'
const router = Router()


router.get("/",getBooking)
router.get("/:id", getByIdBooking)
router.post("/", createBooking)
router.delete("/:id", deleteBooking)
router.put("/:id", updateBooking)

export default router