import userModel from "../models/userModel.js"
import { hashPassword, comparePassword, createJWT } from "../helper/authHelper.js"

const registerController = async (req, res) => {

    try {
        const { name, email, password, phone, address } = req.body

        if (!name) {
            return res.json({ message: "Name is required!" })
        }

        if (!email) {
            return res.json({ message: "Email is required!" })
        }

        if (!password) {
            return res.json({ message: "Password is required!" })
        }

        if (!phone) {
            return res.json({ message: "Phone is required!" })
        }

        if (!address) {
            return res.json({ message: "Address is required!" })
        }

        // existing user check
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(200).json({
                success: false,
                message: "Already registered, please login"
            })
        }

        // hash password
        const hashedPassword = await hashPassword(password)

        // save user to db
        const newUser = await new userModel({ name, email, password: hashedPassword, phone, address }).save()

        res.status(201).json({
            success: true,
            message: "User created successfully!",
            user: newUser
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "User registration failed",
            error
        })
    }
}

const loginController = async (req, res) => {
    try {
        const email = req.body.email
        const pass = req.body.password
        if (!email || !pass) {
            return res.status(404).json({
                success: false,
                message: "Invalid email or password!"
            })
        }
        // check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(200).json({
                succe: false,
                message: "No user found with this credentials!"
            })
        }

        const matchPassword = await comparePassword(pass, user.password)
        if (!matchPassword) {
            return res.status(200).json({
                success: false,
                message: "Password Error"
            })
        }

        const token = await createJWT({ _id: user._id })
        const { password, ...details } = user._doc
        return res.status(200).json({
            success: true,
            message: "User logged in!",
            details,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "User login failed",
            error
        })
    }
}


export { registerController, loginController }