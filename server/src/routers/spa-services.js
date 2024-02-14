import { Router } from 'express'
import { createSpaServices, deleteSpaServices, getByIdSpaServices, getSpaServices, updateSpaServices } from '../controllers/spa-services.js'
const router = Router()


router.get("/",getSpaServices)
router.get("/:id", getByIdSpaServices)
router.post("/", createSpaServices)
router.delete("/:id", deleteSpaServices)
router.put("/:id", updateSpaServices)

export default router