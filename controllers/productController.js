import slugify from "slugify"
import productModel from "../models/productModel.js"
import fs from "fs"

export const createProduct = async (req, res) => {
    const { name, description, price, category, quantity } = req.fields
    const { photo } = req.files
    if (!name) {
        return res.status(400).json({ message: "Please enter product name!" })
    }
    if (!description) {
        return res.status(400).json({ message: "Please enter product description!" })
    }
    if (!price) {
        return res.status(400).json({ message: "Please enter product price!" })
    }
    if (!category) {
        return res.status(400).json({ message: "Please enter product category!" })
    }
    if (!quantity) {
        return res.status(400).json({ message: "Please enter product quantity!" })
    }
    if (!photo | photo.size > 1048576) {
        return res.status(400).json({ message: "Photo is required and must not be more than 1 MB!", size: photo.size })
    }
    try {
        const product = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        console.log(product);
        res.status(201).json({
            success: true,
            message: "Product created successfully!",
            product
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}