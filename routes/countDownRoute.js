const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/auth");
const { getAllCountDown, createCountDown } = require("../controllers/countDownController");

const router = express.Router();


router.route("/").get( getAllCountDown);

router.route("/new").post(isAuthenticatedUser, createCountDown);



module.exports = router;