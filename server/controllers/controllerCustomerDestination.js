const { CustomerDestination, Destination, Customer } = require('../models/index');
const nodemailer = require("nodemailer");
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
                },
            })
            res.status(200).json({
                message: `Your itinerary with id ${id}, deleted successfully`
            })
        } catch (error) {
            next(error)
        }
    }
    // send detail to email
    static async sendItinerary(req, res, next) {
        const { id } = req.Customer
        try {
            const selectedUser = await Customer.findByPk(id)
            const customerEmail = selectedUser.email
            const selectedItinerary = await CustomerDestination.findAll({
                where: {
                    customerId: id
                },
                include: {
                    model: Destination,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                },
            })
            if (!selectedItinerary) {
                throw { name: "You don't have any itinerary" }
            }
            // ?send email itinerary list
            let temp = `<h1 style="color:#4D4C7D">This is your travel plans from "Malaban Itinerary"</h1>\n`
            selectedItinerary.forEach((el, i) => {
                temp += `<p>${i + 1}. ${el.Destination.title}</p><br>\n`
            })
            // console.log(temp);
            let transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                    user: "dimaskurniawan0000@outlook.co.id",
                    pass: "dimaskurniawan0804"
                }
            });
            if (selectedItinerary) {
                let info = await transporter.sendMail({
                    from: 'dimaskurniawan0000@outlook.co.id', // sender address
                    to: customerEmail, // list of receivers
                    subject: "Registration Information", // Subject line
                    text: "Hello world? mantapppp", // plain text body
                    html: `${temp}
                    <h1 style="color:#4D4C7D">Enjoy Your Trip</h1>
                    `, // html body
                });
                console.log(info, "success send email");
            }

            res.status(200).json(selectedItinerary)
            // console.log(selectedItinerary);
        } catch (error) {
            console.log(error);
            // next(error)
        }
    }
}

module.exports = ControllerCustomerDestination