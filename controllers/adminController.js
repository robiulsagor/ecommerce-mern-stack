import secretModel from "../models/secretModel.js";
import userModel from "../models/userModel.js";


const addSecret = async (req, res) => {
    const { secret } = req.body
    if (!secret) {
        return res.json({
            success: false,
            message: "Please type a secret question!"
        })
    }

    try {
        const result = await secretModel({ name: secret }).save()
        console.log(result);
        return res.json({
            success: true,
            message: "Question added successfully!"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Please type a secret question!"
        })
    }

}

const viewSecrets = async (req, res) => {
    try {
        const response = await secretModel.find()

        res.json({
            success: true,
            message: "Secrets loaded!",
            secrets: response
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "error loading secrets!",
            error
        })
    }
}

const viewSingleSecret = async (req, res) => {
    const { id } = req.query
    try {
        const response = await secretModel.findOne({ _id: id })

        res.json({
            success: true,
            message: "Secret loaded!",
            secret: response
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "error loading secret!",
            error
        })
    }
}

const usersWithThisQuestion = async (req, res) => {
    const { id } = req.query
    try {
        const response = await userModel.find({ question: id })
        console.log(response);
        res.json(response.length)
    } catch (error) {
        console.log(error);
    }
}

const deleteSecret = async (req, res) => {
    const { id } = req.query
    console.log(id);
    try {
        const response = await secretModel.deleteOne({ _id: id })
        console.log(response);
        return res.json({
            success: true,
            message: "Deleted",
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Error",
            error
        })
    }
}


const editSecret = async (req, res) => {
    const { id, secret } = req.body
    console.log(id, secret);
    try {
        const response = await secretModel.findByIdAndUpdate(id, { name: secret }, { new: true })
        console.log(response);
        return res.json({
            success: true,
            message: "updated",
            response
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Error",
            error
        })
    }
}



export { addSecret, viewSecrets, usersWithThisQuestion, viewSingleSecret, deleteSecret, editSecret }