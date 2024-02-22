import { Router } from 'express'
import { resetPassword } from '../controllers/user.js'
const router = Router()


router.post("/",resetPassword)


export default router