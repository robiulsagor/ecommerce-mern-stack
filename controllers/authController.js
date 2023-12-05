import userModel from "../models/userModel.js"
import { hashPassword, comparePassword, createJWT } from "../helper/authHelper.js"

const registerController = async (req, res) => {

    try {
        const { name, email, password, phone, address, question, secret } = req.body

        console.log(question);

        if (!name) {
            return res.json({
                message: "Name is required!",
                success: false
            })
        }

        if (!email) {
            return res.json({
                message: "Email is required!",
                success: false
            })
        }

        if (!password) {
            return res.json({
                message: "Password is required!",
                success: false
            })
        }

        if (!phone) {
            return res.json({
                message: "Phone is required!",
                success: false
            })
        }

        if (!address) {
            return res.json({ message: "Address is required!" })
        }

        if (!question) {
            return res.json({ message: "Question is required!" })
        }

        if (!secret) {
            return res.json({ message: "Secret is required!" })
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
        const newUser = await new userModel({ name, email, password: hashedPassword, phone, address, question, secret }).save()

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
        console.log(req.body);
        const email = req.body.email
        const pass = req.body.password
        if (!email || !pass) {
            return res.status(200).json({
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
        let message;
        user.role === 1 ? message = "Admin Logged In!" : message = "User Logged In!"
        return res.status(200).json({
            success: true,
            message,
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

export const passwordReset = async (req, res) => {
    const { email, secret, newPassword } = req.body
    if (!email) {
        return res.json({ success: false, message: "Email error" })
    }
    if (!secret) {
        return res.json({ success: false, message: "Please answer secret question." })
    }
    if (!newPassword) {
        return res.json({ success: false, message: "Please type a new password" })
    }

    // find the user using email
    const user = await userModel.findOne({ email })

    if (!user) {
        return res.json({ success: false, message: "No user found with this email" })
    }

    if (secret.trim() !== user.secret) {
        return res.json({ success: false, message: "Secret answer does not match!" })
    }

    const hashedPassword = await hashPassword(newPassword)
    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword })

    res.json({ success: true, message: "Password changed successfully!" })

}


export { registerController, loginController }