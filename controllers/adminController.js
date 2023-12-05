export const secretQuestionAdd = async (req, res) => {
    const { secret } = req.body

    return res.json(secret)
}