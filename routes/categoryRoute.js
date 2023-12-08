import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import { createCategory, deleteCategory, getAllCategories, singleCategory, updateCategory } from "../controllers/categoryController.js"

const router = express.Router()

// create a category
router.post("/create-category", requireSignIn, isAdmin, createCategory)

// update a category
router.post("/update-category", requireSignIn, isAdmin, updateCategory)

// delete a category
router.post("/delete-category/:id", requireSignIn, isAdmin, deleteCategory)

// show all categories
router.post("/get-all-categories", getAllCategories)

// show single category
router.post("/single-category/:id", singleCategory)

export default router