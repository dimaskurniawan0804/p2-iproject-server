const express = require('express')
const router = express.Router()
const ControllerDestination = require('../controllers/controllerDestination')

router.get('/all', ControllerDestination.getAllDestinination)
// router.post('/login', ControllerCustomer.customerLogin)

module.exports = router