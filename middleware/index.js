const ErrorResponse = require("../utils/appResponse/errorResponse");

module.exports = {
    LoginMiddleware: (req, res, next) => {
        if (!req.body.username) {
            return res.status(400).json(new ErrorResponse({field: 'username', message: 'username is required'}));
        } else if (!req.body.password) {
            return res.status(400).json(new ErrorResponse({field: 'password', message: 'password is required'}));
        }
        next()
    }
}