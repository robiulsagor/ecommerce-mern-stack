import express from "express"
import { loginController, passwordReset, registerController } from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"

// router objects
const router = express.Router()

// register route
router.post("/register", registerController)

// login route
router.post("/login", loginController)

// forget password
router.post("/forgot-password", passwordReset)

// protected route
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).json({ ok: true, success: true })
})

// test admin route
router.get("/admin", requireSignIn, isAdmin, (req, res) => {
    console.log("surely admin");
    return res.json("Yes, you are admin!")
})


export default router