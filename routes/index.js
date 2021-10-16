const Controller = require("../controller");
const Middleware = require("../middleware");
const { validateToken } = require("../middleware/auth");

const router = require("express").Router();

router.post("/login", Middleware.LoginMiddleware, Controller.LoginController);
router.post(
  "/jsonpatch",
  [validateToken, Middleware.JsonpatchMiddleware],
  Controller.JsonpatchController
);
router.post(
  "/thumbnail",
  [validateToken, Middleware.ThumbnailMiddleware],
  Controller.ThumbnailController
);

module.exports = router;
