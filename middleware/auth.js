const JWT = require("jsonwebtoken");
const ErrorResponse = require("../utils/appResponse/errorResponse");

const validateMiddleware = {
  validateToken: (req, res, next) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        return res
          .status(401)
          .send(new ErrorResponse("No Authorization headers"));
      }

      JWT.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send(new ErrorResponse(err));
        }
        req.decoded = decoded;
        next();
      });
    } catch (err) {
      res.status(500).send(new ErrorResponse(err));
    }
  },
};

module.exports = validateMiddleware;
