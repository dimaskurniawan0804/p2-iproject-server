const { verifyToken } = require('../helpers/jwt')
const { Customer } = require('../models/index')

const aunthenticationCustomer = async (req, res, next) => {
    const { access_token } = req.headers
    try {
        const payload = verifyToken(access_token)
        const selectedCustomer = await Customer.findByPk(payload.id)

        if (!selectedCustomer) {
            throw { name: "Unauthorized", statusCode: 401 }
        } else {
            req.Customer = {
                id: selectedCustomer.id,
                firstName: selectedCustomer.firstName
            }
            next()
        }
    } catch (error) {
        next(error)
    }
}

module.exports = aunthenticationCustomer