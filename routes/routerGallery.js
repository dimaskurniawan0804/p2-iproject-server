const express = require('express')
const router = express.Router()
const ControllerGallery = require('../controllers/controllerGallery')
const aunthenticationCustomer = require('../middlewares/authentication.js')

const multer = require('multer');
const path = require("path");
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../asset"))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: diskStorage,
})

router.get('/get', ControllerGallery.getAllGallery)
router.post('/post', aunthenticationCustomer, upload.single("image"), ControllerGallery.postGallery)
router.delete('/delete/:galleryId', aunthenticationCustomer, ControllerGallery.deleteGallery)

module.exports = router