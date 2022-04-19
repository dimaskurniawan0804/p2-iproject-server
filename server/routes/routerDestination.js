const express = require('express')
const router = express.Router()
const ControllerDestination = require('../controllers/controllerDestination')

router.post('/register', ControllerCustomer.cusRegister)
router.post('/login', ControllerCustomer.customerLogin)

module.exports = router