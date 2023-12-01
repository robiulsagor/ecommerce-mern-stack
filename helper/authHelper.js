import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const hashPassword = async password => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
}

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

export const createJWT = async (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' })
}