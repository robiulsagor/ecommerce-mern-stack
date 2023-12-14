import slugify from "slugify"
import productModel from "../models/productModel.js"
import fs from "fs"
import { log } from "console"

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

export const getSingleProductBySlug = async (req, res) => {
    const { slug } = req.params
    try {
        const product = await productModel.findOne({ slug }).populate("category")
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

export const filterProduct = async (req, res) => {
    try {
        const { checked, radio } = req.body
        let args = {}
        if (checked.length) args.category = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productModel.find(args)
        res.status(200).json({
            success: true,
            products
        })
        console.log(checked, radio);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while filtering products!"
        })
    }
}

export const productCount = async (req, res) => {
    try {
        const total = await productModel.find().estimatedDocumentCount()
        console.log(total);
        res.status(200).json({
            success: true,
            total
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error
        })
    }
}

export const paginate = async (req, res) => {
    try {
        const perPage = 3
        const page = req.params.page ? req.params.page : 1
        console.log(page);
        const moreProducts = await productModel.find().skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 })
        res.json({
            success: true,
            products: moreProducts
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error
        })
    }
}

export const search = async (req, res) => {
    try {
        const { keyword } = req.params
        const result = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        })
        res.json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error
        })
    }
}