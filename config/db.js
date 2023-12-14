import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        // const conn = await mongoose.connect(process.env.MONGO_URI)
        const conn = await mongoose.connect("mongodb://localhost:27017/ecommerce")
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in Mongodb: ${error}`.bgRed);
    }
}
