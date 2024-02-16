import { Router } from 'express'
import { createGallery, deleteGallery, getByIdGallery, getGallery, updateGallery } from '../controllers/gallery.js'
const router = Router()


router.get("/",getGallery)
router.get("/:id", getByIdGallery)
router.post("/", createGallery)
router.delete("/:id", deleteGallery)
router.put("/:id", updateGallery)

export default router