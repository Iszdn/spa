import { Router } from 'express'
import { createBlogTag, deleteBlogTag,  getBlogTag,  getByIdBlogTag, updateBlogTag } from '../controllers/blogtag.js'
const router = Router()


router.get("/",getBlogTag)
router.get("/:id", getByIdBlogTag)
router.post("/", createBlogTag)
router.delete("/:id", deleteBlogTag)
router.put("/:id", updateBlogTag)

export default router