const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/auth");
const { getAllPromotions, createPromotion } = require("../controllers/promotionController");

const router = express.Router();


router.route("/").get(getAllPromotions);

router.route("/new").post(isAuthenticatedUser, createPromotion);



module.exports = router;