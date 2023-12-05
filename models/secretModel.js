import mongoose from "mongoose";

const secretModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    }
)

export default mongoose.model("secretQuestion", secretModel)