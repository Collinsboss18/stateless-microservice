const ErrorResponse = require("../utils/appResponse/errorResponse");

module.exports = {
  LoginMiddleware: (req, res, next) => {
    if (!req.body.username) {
      return res.status(400).json(
        new ErrorResponse({
          field: "username",
          message: "username is required",
        })
      );
    } else if (!req.body.password) {
      return res.status(400).json(
        new ErrorResponse({
          field: "password",
          message: "password is required",
        })
      );
    }
    next();
  },

  JsonpatchMiddleware: (req, res, next) => {
    if (!req.body.patch) {
      return res.status(400).json(
        new ErrorResponse({
          field: "patch",
          message: "patch is required",
        })
      );
    } else if (!req.body.json) {
      return res.status(400).json(
        new ErrorResponse({
          field: "json",
          message: "json is required",
        })
      );
    }
    next();
  },

  ThumbnailMiddleware: (req, res, next) => {
    if (!req.body.url) {
      return res.status(400).json(
        new ErrorResponse({
          field: "url",
          message: "url is required",
        })
      );
    }
    next();
  },
};
