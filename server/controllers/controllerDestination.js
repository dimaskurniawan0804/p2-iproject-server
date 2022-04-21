const { Customer, Destination, Gallery, CustomerDestination } = require('../models/index');

class ControllerDestination {
    static async getAllDestinination(req, res, next) {
        try {
            const response = await Destination.findAll({
                order: [["id", "ASC"]]
            })
            res.status(200).json(response)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async destinationDetail(req, res, next) {
        const { destinationId } = req.params
        try {
            const response = await Destination.findByPk(destinationId, {
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })
            res.status(200).json(response)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = ControllerDestination