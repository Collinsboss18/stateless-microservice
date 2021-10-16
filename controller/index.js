const SuccessResponse = require("../utils/appResponse/successResponse");
const { hashedPassword, createToken } = require("../utils/encrypt");
const jsonpatch = require("jsonpatch");
const ErrorResponse = require("../utils/appResponse/errorResponse");
const { default: axios } = require("axios");
const sharp = require("sharp");
const fs = require("fs");

module.exports = {
  LoginController: async (req, res) => {
    let { username, password } = req.body;
    try {
      const hashed = await hashedPassword(password);
      const token = await createToken({ username, password }, "5d");
      return res
        .status(200)
        .json(new SuccessResponse({ username, password: hashed, token }));
    } catch (error) {
      return res.status(500).json(new ErrorResponse(error));
    }
  },

  JsonpatchController: async (req, res) => {
    let { json, patch } = req.body;

    try {
      if (patch.constructor == Array) {
      } else if (patch.constructor == Object) {
        patch = [patch];
      } else {
        throw new Error("patch must be an object");
      }

      let updated = jsonpatch.apply_patch(json, patch);
      return res.status(200).json(new SuccessResponse(updated));
    } catch (error) {
      return res.status(500).json(new ErrorResponse(error));
    }
  },

  ThumbnailController: async (req, res) => {
    let { url } = req.body;

    try {
      const res = await axios.get(url, { responseType: "arraybuffer" });
      const buffer = Buffer.from(res.data, "utf-8");
      let image = await sharp(buffer).resize(50, 50).toBuffer();
      return res.status(200).json(new SuccessResponse(image));
    } catch (error) {
      return res.status(500).json(new ErrorResponse(error));
    }
  },
};
