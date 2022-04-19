const { Customer, Destination, Gallery, CustomerDestination } = require('../models/index');
const { comparePassword } = require('../helpers/bcryptjs');
const { verifyToken, createToken } = require('../helpers/jwt.js');
const nodemailer = require("nodemailer");

class ControllerCustomer {
    static async cusRegister(req, res, next) {
        const { firstName, lastName, email, password, phoneNumber, address } = req.body
        try {
            const response = await Customer.create({
                firstName, lastName, email, password, phoneNumber, address
            })
            const cusFullName = response.firstName + " " + response.lastName
            res.status(201).json({
                id: response.id,
                fullName: cusFullName,
                email: response.email
            })

            // ?send email success registration

            let transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                    user: "dimaskurniawan0000@outlook.co.id",
                    pass: "dimaskurniawan0804"
                }
            });

            console.log(transporter, "<<<<<<<");

            let info = await transporter.sendMail({
                from: 'dimaskurniawan0000@outlook.co.id', // sender address
                to: "ichbindimas@gmail.com", // list of receivers
                subject: "Registration Information", // Subject line
                text: "Hello world? mantapppp", // plain text body
                html: `<b>Hello ${cusFullName}</b> 
                <h1>You just registration to MALABAN ITINERARY</h1><br>`, // html body
            });

            console.log(info, "+++++++++++");

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

            let testAccount = await nodemailer.createTestAccount();
            console.log(testAccount);

            let transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                    user: "dimaskurniawan0000@outlook.co.id",
                    pass: "dimaskurniawan0804"
                }
            });

            console.log(transporter, "<<<<<<<");

            let info = await transporter.sendMail({
                from: 'dimaskurniawan0000@outlook.co.id', // sender address
                to: "ichbindimas@gmail.com", // list of receivers
                subject: "Hello ✔, masuk dari nodemialer i project", // Subject line
                text: "Hello world? mantapppp", // plain text body
                html: `<b>Hello world?</b> <img src="https://www.libur.co/wp-content/uploads/2021/07/Air-Terjun-Jenum.jpg">`, // html body
            });

            console.log(info, "+++++++++++");

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = ControllerCustomer