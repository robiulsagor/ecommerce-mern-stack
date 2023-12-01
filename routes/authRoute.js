import express from "express"
import { loginController, registerController } from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"

// router objects
const router = express.Router()

router.post("/register", registerController)

router.post("/login", loginController)

export default router