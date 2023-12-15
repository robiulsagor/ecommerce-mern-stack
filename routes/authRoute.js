import express from "express"
import { checkSecret, findUser, loginController, passwordReset, registerController, updateProfile } from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"

// router objects
const router = express.Router()

// password reset ==========
// part one - find user by email
router.get("/find-user", findUser)

// part two - check secret answer
router.get("/check-secret", checkSecret)

// password reset ==========

// register route
router.post("/register", registerController)

// login route
router.post("/login", loginController)



// forget password
router.put("/change-password", passwordReset)

// user protected route
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).json({ ok: true, success: true })
})

// admin protected route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).json({ ok: true, success: true })
})

// test admin route
router.get("/admin", requireSignIn, isAdmin, (req, res) => {
    console.log("surely admin");
    return res.json("Yes, you are admin!")
})

// user profile upadate
router.put("/update-profile", requireSignIn, updateProfile)

export default router