const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/auth");
const { getAllServices, createService } = require("../controllers/serviceController");

const router = express.Router();


router.route("/").get(getAllServices);

router.route("/new").post(isAuthenticatedUser, createService);

module.exports = router;