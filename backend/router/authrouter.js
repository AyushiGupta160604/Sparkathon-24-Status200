const express = require ("express");
const router = express.Router();
const authControl = require("../Controllers/auth-controller");
const authenticate=require("../Controllers/authenticate.js");
require("../DB/connect.js");
router.route("/").get(authControl.home);
router.route("/register").post(authControl.register);
router.route("/login").post(authControl.login);
router.route("/profile").get(authenticate,authControl.profile);
router.route("/cart").post(authControl.addToCart);
router.route("/product").get(authControl.Product);
router.route("/products").get(authControl.LED);


module.exports = router;