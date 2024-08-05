const express = require ("express");
const router = express.Router();
const authControl = require("../Controllers/auth-controller");

router.route("/").get(authControl.home);

module.exports = router;