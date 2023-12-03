import express from "express"
import colors from "colors"
import morgan from "morgan";
import cors from "cors"
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoute.js"

// database config
connectDB()

// create app
const app = express()

// middlewares
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())
app.use(cors())

// routes
app.use("/api/v1/auth", authRoutes)

// create api
app.get("/", (req, res) => {
    res.json({ message: "Api is working fine" })
})

const PORT = process.env.PORT | 8080;

app.listen(PORT, () => {
    console.log(`Server is started on ${PORT}`.bgCyan.black);
})