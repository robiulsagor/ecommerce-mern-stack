import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import { createProduct, deleteProduct, filterProduct, getProducts, getSingleProduct, getSingleProductBySlug, paginate, productCount, search, updateProduct } from "../controllers/productController.js"

const router = express.Router()

// create product
router.post("/create-product", requireSignIn, isAdmin, createProduct)

// get all products
router.get("/get-product", getProducts)

// get single product by id
router.get("/get-product/:id", getSingleProduct)

// get single product by slug
router.get("/get-product/:slug", getSingleProductBySlug)

// delete product 
router.delete("/delete-product/:id", requireSignIn, isAdmin, deleteProduct)

// update product
router.put("/update-product/:id", requireSignIn, isAdmin, updateProduct)

// filter product
router.post("/filter-product", filterProduct)

// product count
router.get("/product-count", productCount)

// paginate
router.get("/paginate/:page", paginate)

// search
router.get("/search/:keyword", search)

export default router