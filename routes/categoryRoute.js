import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import { createCategory, deleteCategory, getAllCategories, singleCategory, updateCategory } from "../controllers/categoryController.js"

const router = express.Router()

// create a category
router.post("/create-category", requireSignIn, isAdmin, createCategory)

// update a category
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategory)

// delete a category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategory)

// show all categories
router.get("/get-all-categories", getAllCategories)

// show single category
router.get("/single-category/:slug", singleCategory)

export default router