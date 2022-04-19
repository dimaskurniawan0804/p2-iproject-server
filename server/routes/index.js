const express = require('express')
const router = express.Router()
const routerCustomer = require('./routerCustomer')
// const routerDestination = require('./destination')
// const routerGallery = require('./gallery')

router.use('/customer', routerCustomer)
// router.use('/users', routerUser)
// router.use('/genres', routerGenre)
// router.use('/histories', routerHistory)
// router.use('/cust', routerCustomer)

module.exports = router