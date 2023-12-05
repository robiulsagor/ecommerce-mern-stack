import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import { addSecret, deleteSecret, editSecret, usersWithThisQuestion, viewSecrets, viewSingleSecret } from "../controllers/adminController.js"

// router objects
const router = express.Router()

router.post("/add-secret", requireSignIn, isAdmin, addSecret)

router.get("/view-secrets", viewSecrets)

router.get("/view-single-secret", requireSignIn, isAdmin, viewSingleSecret)

router.get("/view-user-with-this-question", usersWithThisQuestion)

router.delete("/delete-secret", requireSignIn, isAdmin, deleteSecret)

router.put("/edit-secret", requireSignIn, isAdmin, editSecret)

export default router