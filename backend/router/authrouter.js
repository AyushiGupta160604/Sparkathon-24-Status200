const express = require ("express");
const router = express.Router();
const authControl = require("../Controllers/auth-controller");
const authenticate=require("../Controllers/authenticate.js");
require("../DB/connect.js");
router.route("/").get(authControl.home);
router.route("/register").post(authControl.register);
router.route("/login").post(authControl.login);
router.route("/profile").get(authenticate,authControl.profile);
router.route("/cart")
    .get(authenticate, authControl.getCart)
    .post(authenticate, authControl.addToCart)
    .delete(authenticate, authControl.removeFromCart);
router.route("/products").get(authControl.LED);
router.route('/placeorder').post(authenticate,authControl.placeorder);
router.route('/getUserOrders ').post(authenticate,authControl.getUserOrders);

module.exports = router;