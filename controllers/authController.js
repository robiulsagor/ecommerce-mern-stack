import userModel from "../models/userModel.js"
import secretModel from "../models/secretModel.js";
import { hashPassword, comparePassword, createJWT } from "../helper/authHelper.js"

export const registerController = async (req, res) => {

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

export const loginController = async (req, res) => {
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

// for password recovery ===========
// part - 1
// find user by email and find the 
// secret question selected by user
export const findUser = async (req, res) => {
    const { email } = req.query
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Please type your email!"
        })
    }

    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No User Found!"
            })
        }

        // get the secret question text by id
        const userQuestion = await secretModel.findOne({ _id: user.question })

        return res.status(200).json({
            success: true,
            question: userQuestion
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

// part - 2
// check the secret answer provided by the user
export const checkSecret = async (req, res) => {
    const { email, secret } = req.query
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No user found!"
            })
        }

        if (user.secret !== secret) {
            return res.status(400).json({
                success: false,
                message: "Answer did not match!"
            })
        }

        res.status(200).json({
            success: true,
            message: "Answer matched!"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

// part - 3
// change password
export const passwordReset = async (req, res) => {
    const { email, newPassword } = req.body
    if (!email) {
        return res.json({ success: false, message: "Email error" })
    }
    if (!newPassword) {
        return res.json({ success: false, message: "Please type a new password" })
    }

    // find the user using email
    const user = await userModel.findOne({ email })

    if (!user) {
        return res.json({ success: false, message: "No user found with this email" })
    }

    const hashedPassword = await hashPassword(newPassword)
    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword })

    res.status(200).json({ success: true, message: "Password changed successfully!" })
}

// ============
// update profile
export const updateProfile = async (req, res) => {
    const { name, email, phone, password, address } = req.body
    let hashedPassword;

    if (password) {
        hashedPassword = await hashPassword(password)
    }

    console.log(hashedPassword);

    try {
        const updateFields = {
            name,
            email,
            phone,
            address,
        };

        if (hashedPassword) {
            updateFields.password = hashedPassword
        }
        const updated = await userModel.findByIdAndUpdate(req.user._id, updateFields, { new: true })
        console.log(updated);
        res.json({
            success: true,
            message: "Updated successfully!",
            updated
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Something went wrong!",
            error
        })
    }
}
