const errorHandler = async (error, req, res, next) => {
    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            err = error.errors.map(el => el.message)
            res.status(400).json({
                statusCode: 400,
                message: err
            })
            break;
        case "Invalid email/password":
            res.status(401).json({ message: error.name })
            break;
        case "JsonWebTokenError":
            res.status(401).json({ message: "Invalid token" })
            break;
        case "Invalid token":
            res.status(401).json({ message: error.name })
            break;
        case "Data not found":
            res.status(404).json({ message: error.name })
            break;
        case "You are not authorized":
            res.status(403).json({ message: error.name })
            break;
        case "Same Destination List":
            res.status(403).json({ message: "This destination is already on your favorite list" })
            break;

        default:
            break;
    }
}

module.exports = errorHandler