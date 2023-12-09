import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import { createProduct, deleteProduct, getProductPhoto, getProducts, getSingleProduct, updateProduct } from "../controllers/productController.js"
import formidable from "express-formidable"

const router = express.Router()

// create product
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProduct)

// get all products
router.get("/get-products", getProducts)

// get single product
router.get("/get-product/:slug", getSingleProduct)

// get product photo
router.get("/get-product-photo/:id", getProductPhoto)

// delete product 
router.delete("/delete-product/:id", requireSignIn, isAdmin, deleteProduct)

// update product
router.put("/update-product/:id", requireSignIn, isAdmin, formidable(), updateProduct)

export default router