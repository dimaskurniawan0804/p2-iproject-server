const express = require('express')
const router = express.Router()
const ControllerCustomerDestination = require('../controllers/controllerCustomerDestination')
const aunthenticationCustomer = require('../middlewares/authentication.js')

router.post('/add/:destinationId', aunthenticationCustomer, ControllerCustomerDestination.addItinerary)
router.delete('/delete/:itineraryId', aunthenticationCustomer, ControllerCustomerDestination.deleteItinerary)
router.get('/print', aunthenticationCustomer, ControllerCustomerDestination.sendItinerary)

module.exports = router