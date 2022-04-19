const express = require('express')
const router = express.Router()
const ControllerCustomerDestination = require('../controllers/controllerCustomerDestination')

router.post('/add/:destinationId', ControllerCustomerDestination.addItinerary)
// router.post('/login', ControllerCustomer.customerLogin)

module.exports = router