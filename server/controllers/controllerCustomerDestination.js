const { CustomerDestination } = require('../models/index');

class ControllerCustomerDestination {
    static async addItinerary(req, res, next) {
        const { destinationId } = req.params
        const { id } = req.Customer
        console.log(id, destinationId);
        try {
            const checkItinerary = await CustomerDestination.findOne({
                where: {
                    customerId: id,
                    destinationId: destinationId
                }
            })
            console.log(checkItinerary);

            if (checkItinerary) {
                throw { name: "Same Destination List" }
            }
            const response = await CustomerDestination.create({
                destinationId: destinationId,
                customerId: id,
            })

            res.status(201).json(response)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async deleteItinerary(req, res, next) {
        const { itineraryId } = req.params
        try {
            const selectedItinerary = await CustomerDestination.findByPk(itineraryId)
            if (!selectedItinerary) {
                throw { name: "Data not found" }
            }
            await CustomerDestination.destroy({
                where: {
                    id: itineraryId
                }
            })
            res.status(200).json({
                message: `Your itinerary with id ${id}, deleted successfully`
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerCustomerDestination