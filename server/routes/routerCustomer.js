const express = require('express')
const router = express.Router()
const ControllerCustomer = require('../controllers/controllerCustomer')

router.post('/register', ControllerCustomer.cusRegister)
router.post('/login', ControllerCustomer.customerLogin)

module.exports = router