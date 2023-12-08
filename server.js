import express from "express"
import colors from "colors"
import morgan from "morgan";
import cors from "cors"
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoute.js"
import adminRoutes from "./routes/adminRoute.js"
import categoryRoutes from "./routes/categoryRoute.js"
import productRoutes from "./routes/productRoute.js"

// database config
connectDB()

// create app
const app = express()

// middlewares
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())
app.use(cors())

// routes
app.get("/api/v1/test", (req, res) => {
    res.json("THis is a test route")
})
app.use("/api/v1/auth/", authRoutes)
app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product", productRoutes)

// create api
app.get("/", (req, res) => {
    res.json({ message: "Api is working fine" })
})

const PORT = process.env.PORT | 8080;

app.listen(PORT, () => {
    console.log(`Server is started on ${PORT}`.bgCyan.black);
})