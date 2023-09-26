const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/auth");
const { createSlider, getAllSliders } = require("../controllers/sliderController");

const router = express.Router();


router.route("/").get(getAllSliders);

router.route("/new").post(isAuthenticatedUser, createSlider);

module.exports = router;