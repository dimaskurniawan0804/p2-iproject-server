const { Gallery } = require('../models/index');

class ControllerGallery {
    static async postGallery(req, res, next) {
        // console.log(req.file, "<<<<<<<");
        const { id } = req.Customer
        const { location } = req.body
        try {
            const response = await Gallery.create({
                imageUrl: req.file.filename,
                location: location,
                customerId: id
            })
            res.status(201).json(response)
        } catch (error) {
            next(error);
        }
    }

    static async deleteGallery(req, res, next) {
        const { id } = req.Customer
        const { galleryId } = req.params
        try {
            const checkGallery = await Gallery.findByPk(galleryId)
            if (!checkGallery) {
                throw { name: "Data not found" }
            }
            if (checkGallery.customerId !== id) {
                throw { name: "You are not authorized" }
            }
            const response = await Gallery.destroy({
                where: {
                    customerId: id,
                    id: galleryId
                }
            })
            res.status(200).json({
                message: `Gallery with id ${galleryId}, deleted successfully`
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllGallery(req, res, next) {
        try {
            const response = await Gallery.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerGallery