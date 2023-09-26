const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/auth");
const { getAllPortfolios, createPortfolio } = require("../controllers/portfolioController");

const router = express.Router();


router.route("/").get(getAllPortfolios);

router.route("/new").post(isAuthenticatedUser, createPortfolio);



module.exports = router;