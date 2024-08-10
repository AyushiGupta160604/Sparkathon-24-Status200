const express = require ("express");
const router = express.Router();
const authControl = require("../Controllers/auth-controller");
require("../DB/connect.js");
router.route("/").get(authControl.home);
router.route("/register").post(authControl.register);
router.route("/login").post(authControl.login);
router.route("/profile").get(authControl.profile);
router.route("/cart").post(authControl.addToCart);

module.exports = router;