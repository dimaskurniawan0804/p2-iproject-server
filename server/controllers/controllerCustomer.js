const { Customer, Destination, Gallery, CustomerDestination } = require('../models/index');
const { comparePassword } = require('../helpers/bcryptjs');
const { verifyToken, createToken } = require('../helpers/jwt.js');
const nodemailer = require("nodemailer");

class ControllerCustomer {
    static async cusRegister(req, res, next) {
        let { firstName, lastName, email, password, phoneNumber, address } = req.body
        try {
            if (!phoneNumber) {
                phoneNumber = "Customer don't input phone number"
            }
            if (!address) {
                address = "Customer don't input address"
            }
            const response = await Customer.create({
                firstName, lastName, email, password, phoneNumber, address
            })
            const cusFullName = response.firstName + " " + response.lastName
            res.status(201).json({
                id: response.id,
                fullName: cusFullName,
                email: response.email
            })

            const customerEmail = response.email

            // ?send email success registration

            let transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                    user: "dimaskurniawan0000@outlook.co.id",
                    pass: "dimaskurniawan0804"
                }
            });
            if (response) {
                let info = await transporter.sendMail({
                    from: 'dimaskurniawan0000@outlook.co.id', // sender address
                    to: customerEmail, // list of receivers
                    subject: "Registration Information", // Subject line
                    text: "Hello world? mantapppp", // plain text body
                    html: `<b>Hello ${cusFullName}</b> 
                    <h1>You just registration to MALABAN ITINERARY</h1><br>
                    <h1>Make your favorite travel plans in Berau, East Borneo</h1><br>
                    `, // html body
                });
                console.log(info, "success send registration email");
            }

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    // !LOGIN CUSTOMER
    static async customerLogin(req, res, next) {
        const { email, password } = req.body
        try {
            if (!email) {
                throw { name: "Email is required" }
            }
            if (!password) {
                throw { name: "Password is required" }
            }

            const customer = await Customer.findOne({
                where: {
                    email: email
                }
            })

            if (!customer) {
                throw { name: "Invalid email/password" }
            }

            const chekPassword = comparePassword(password, customer.password)
            if (!chekPassword) {
                throw { name: "Invalid email/password" }
            }

            const payload = {
                id: customer.id
            }

            const access_token = createToken(payload)
            res.status(200).json({
                id: customer.id,
                fullName: customer.firstName + " " + customer.lastName,
                access_token,
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    // ! get my itinerary
    static async getMyList(req, res, next) {
        const { id } = req.Customer
        try {
            const response = await CustomerDestination.findAll({
                where: {
                    customerId: id
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                include: {
                    model: Destination,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                },
            })
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerCustomer