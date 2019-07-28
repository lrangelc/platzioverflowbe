export const handleError = (err,res) => {
    res.status(500).json({
        message: 'An error ocurred',
        error: err
    })
}