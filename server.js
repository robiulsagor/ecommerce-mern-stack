import express from "express"
import colors from "colors"

// create app
const app = express()

const PORT = process.env.PORT | 8080;

// create api
app.get("/", (req, res) => {
    res.send("<h1>Hello, this is test web page</h1>")
})

app.listen(PORT, () => {
    console.log(`Server is started on ${PORT}`.bgCyan.black);
})