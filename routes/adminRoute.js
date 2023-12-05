import express from "express"
import { secretQuestionAdd } from "../controllers/adminController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/add-secret", requireSignIn, isAdmin, secretQuestionAdd)

export default router