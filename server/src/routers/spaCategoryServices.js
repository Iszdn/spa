import { Router } from 'express'
import { createSpaserviceCategory, deleteSpaserviceCategory, getByIdSpaserviceCategory, getSpaserviceCategory, updateSpaserviceCategory } from '../controllers/spaCategoryServices.js'
const router = Router()


router.get("/",getSpaserviceCategory)
router.get("/:id", getByIdSpaserviceCategory)
router.post("/", createSpaserviceCategory)
router.delete("/:id", deleteSpaserviceCategory)
router.put("/:id", updateSpaserviceCategory)

export default router