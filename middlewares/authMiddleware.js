import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

export const requireSignIn = async (req, res, next) => {
    try {
        const token = await req.headers.authorization
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "No token found!"
            })
        }

        const verify = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = verify
        if (!verify) {
            return res.status(400).json({
                success: false,
                message: "Invalid token!"
            })
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Failed",
            error: error.message
        })
    }
}

export const isAdmin = async (req, res, next) => {
    console.log(req.user);
    try {
        const checkAdmin = await userModel.findById({ _id: req.user._id })
        if (checkAdmin.role !== 1) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized access!"
            })
        }
        next()
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error!",
            error
        })
    }
}