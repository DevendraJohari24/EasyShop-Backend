const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/auth");
const { getAllFeatures, createFeature } = require("../controllers/featureController");

const router = express.Router();


router.route("/").get(getAllFeatures);

router.route("/new").post(isAuthenticatedUser, createFeature);



module.exports = router;