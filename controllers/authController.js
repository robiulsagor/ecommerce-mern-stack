import userModel from "../models/userModel.js"
import { hashPassword } from "../helper/authHelper.js"

const registerController = async (req, res) => {

    try {
        const { name, email, password, phone, address } = req.body

        if (!name) {
            return res.json({ error: "Name is required!" })
        }

        if (!email) {
            return res.json({ error: "Email is required!" })
        }

        if (!password) {
            return res.json({ error: "Password is required!" })
        }

        if (!phone) {
            return res.json({ error: "Phone is required!" })
        }

        if (!address) {
            return res.json({ error: "Address is required!" })
        }

        // existing user check
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(200).json({
                success: true,
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

export { registerController }