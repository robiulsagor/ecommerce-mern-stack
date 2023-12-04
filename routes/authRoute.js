import express from "express"
import { loginController, registerController } from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"

// router objects
const router = express.Router()

// register route
router.post("/register", registerController)

// login route
router.post("/login", loginController)

// protected route
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).json({ ok: true })
})

export default router