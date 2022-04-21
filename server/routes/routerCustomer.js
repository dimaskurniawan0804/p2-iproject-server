const express = require('express')
const router = express.Router()
const ControllerCustomer = require('../controllers/controllerCustomer')
const aunthenticationCustomer = require('../middlewares/authentication.js');

router.post('/register', ControllerCustomer.cusRegister)
router.post('/login', ControllerCustomer.customerLogin)
router.get('/myitinerary', aunthenticationCustomer, ControllerCustomer.getMyList)

module.exports = router