import slugify from "slugify"
import productModel from "../models/productModel.js"
import fs from "fs"

export const createProduct = async (req, res) => {
    const { name, description, price, category, quantity, photoName } = req.body
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
    if (!photoName) {
        return res.status(400).json({ message: "Photo is required !" })
    }
    try {
        const product = new productModel({ ...req.body, slug: slugify(name) })

        await product.save()
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

export const getProducts = async (req, res) => {
    try {
        const products = await productModel.find().limit(10).sort({ createdAt: -1 })
            .populate("category")
        res.status(200).json({
            success: true,
            message: "All products fetched!",
            productCoutnt: products.length,
            products
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

export const getSingleProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await productModel.findById(id).populate("category")
        res.status(200).json({
            success: true,
            message: "Product fetched!",
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

export const getProductPhoto = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id).select("photo")
        if (product.photo.data) {
            res.set('Content-Type', product.photo.contentType)
            return res.send(product.photo.data)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

export const updateProduct = async (req, res) => {
    console.log(req.body);
    const { name, description, price, category, quantity, photoName, photoUrl } = req.body

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

    try {
        const product = await productModel.findByIdAndUpdate(req.params.id,
            { ...req.body, slug: slugify(name) }, { new: true })


        // await product.save()
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
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