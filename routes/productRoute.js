import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import { createProduct, deleteProduct, filterProduct, getProductPhoto, getProducts, getSingleProduct, updateProduct } from "../controllers/productController.js"

const router = express.Router()

// create product
router.post("/create-product", requireSignIn, isAdmin, createProduct)

// get all products
router.get("/get-product", getProducts)

// get single product
router.get("/get-product/:id", getSingleProduct)

// get product photo
router.get("/get-product-photo/:id", getProductPhoto)

// delete product 
router.delete("/delete-product/:id", requireSignIn, isAdmin, deleteProduct)

// update product
router.put("/update-product/:id", requireSignIn, isAdmin, updateProduct)

// filter product
router.post("/filter-product", filterProduct)

export default router