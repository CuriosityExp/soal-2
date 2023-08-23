const { verifyToken } = require("../helpers/jwt")
const { User } = require('../models')
const authentication = async (req,res,next) => {
    try {
        const {access_token} = req.headers
        if (!access_token) {
            throw {name: "InvalidToken"}
        }
        const decode = verifyToken(access_token)
        const user = await User.findByPk(decode.id)
        if (!user) {
            throw {name: "InvalidToken"}
        }
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication