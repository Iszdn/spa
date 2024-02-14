import { Router } from 'express'
import { createBlogCategory, deleteBlogCategory, getBlogCategory, getByIdBlogCategory, updateBlogCategory } from '../controllers/blogCategory.js'
const router = Router()


router.get("/",getBlogCategory)
router.get("/:id", getByIdBlogCategory)
router.post("/", createBlogCategory)
router.delete("/:id", deleteBlogCategory)
router.put("/:id", updateBlogCategory)

export default router