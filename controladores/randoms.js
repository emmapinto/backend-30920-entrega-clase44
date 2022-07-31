export const returnRandoms = async (req, res) => {
    try {
        const cant = req.query.cant || 1e8
        const numbers = await generateRandoms(cant)
        res.json(numbers)
    }
    catch(err) {
        res.json({error: err.message})
    }

}