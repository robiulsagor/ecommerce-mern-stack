import mongoose from "mongoose";

const productModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'Category',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    photoName: {
        type: String,
    },
    photoUrl: {
        type: String,
    },
    shipping: {
        type: Boolean
    }
}, { timestamps: true })


export default mongoose.model("Products", productModel)