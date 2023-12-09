import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

// create a category
export const createCategory = async (req, res) => {
    const { name } = req.body
    const check = await categoryModel.findOne({ name })

    if (check) {
        return res.status(500).json({
            success: false,
            message: "This category already exists!"
        })
    }

    try {
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        return res.status(201).json({
            success: true,
            message: "Category created successfully!",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error
        })
    }
}

// update a category
export const updateCategory = async (req, res) => {
    const { id } = req.params
    const { name } = req.body

    try {
        const updated = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        console.log(updated);
        return res.status(200).json({
            success: true,
            message: "Category updated successfully!",
            updated
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

// delete a category
export const deleteCategory = async (req, res) => {
    const { id } = req.params
    try {
        await categoryModel.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "Category deleted successfully!",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

// show all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find()
        return res.status(200).json({
            success: true,
            message: "Categories fetched!",
            categories
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

// show a single category
export const singleCategory = async (req, res) => {
    const { id } = req.params
    try {
        const category = await categoryModel.findOne({ _id: id })
        console.log(category);
        return res.status(200).json({
            success: true,
            message: "category fetched!",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}