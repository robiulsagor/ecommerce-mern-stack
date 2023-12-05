import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

export const requireSignIn = async (req, res, next) => {
    try {
        const token = await req.headers.authorization
        if (!token) {
            return res.status(200).json({
                success: false,
                message: "No token found!"
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log("Not valid");
                return res.status(200).json({
                    success: false,
                    message: "Token invalid or Expired! Please Login Again"
                })
            }

            req.user = decoded
            next()
        })

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            success: false,
            message: "Failed",
            error: error.message
        })
    }
}

export const isAdmin = async (req, res, next) => {
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