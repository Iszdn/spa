import { Router } from 'express'
import { createBlog, deleteBlog, getBlog, getByIdBlog, updateBlog } from '../controllers/blog.js'
const router = Router()


router.get("/",getBlog)
router.get("/:id", getByIdBlog)
router.post("/", createBlog)
router.delete("/:id", deleteBlog)
router.put("/:id", updateBlog)

export default router