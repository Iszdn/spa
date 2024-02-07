import { Router } from 'express'
import { getShopIcon ,getByIdShopIcon,createShopIcon,deleteShopIcon,updateShopIcon} from '../controllers/shopIcon.js'
const router = Router()


router.get("/",getShopIcon)
router.get("/:id", getByIdShopIcon)
router.post("/", createShopIcon)
router.delete("/:id", deleteShopIcon)
router.put("/:id", updateShopIcon)

export default router