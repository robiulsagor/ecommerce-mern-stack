import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import { createProduct } from "../controllers/productController.js"
import formidable from "express-formidable"

const router = express.Router()

// create product
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProduct)

export default router