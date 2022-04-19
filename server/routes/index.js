const express = require('express')
const router = express.Router()
const routerCustomer = require('./routerCustomer')
const routerDestination = require('./routerDestination')
const routerCustomerDestination = require('./routerCustomerDestination')

router.use('/customer', routerCustomer)
router.use('/destination', routerDestination)
router.use('/cusdest', routerCustomerDestination)
// router.use('/genres', routerGenre)
// router.use('/histories', routerHistory)
// router.use('/cust', routerCustomer)

module.exports = router