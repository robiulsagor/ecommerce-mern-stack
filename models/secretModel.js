import mongoose from "mongoose";

const secretQuestionModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    }
)

export default mongoose.model("secretQuestion", secretQuestionModel)