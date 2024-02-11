import { Router } from 'express'
import { createTeams, deleteTeams, getByIdTeams, getTeams, updateTeams } from '../controllers/team.js'
const router = Router()


router.get("/",getTeams)
router.get("/:id", getByIdTeams)
router.post("/", createTeams)
router.delete("/:id", deleteTeams)
router.put("/:id", updateTeams)

export default router