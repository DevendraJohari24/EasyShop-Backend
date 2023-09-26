const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/auth");
const { getAllFeedbacks, createFeedback } = require("../controllers/feedBackController");

const router = express.Router();


router.route("/").get(getAllFeedbacks);

router.route("/new").post(isAuthenticatedUser, createFeedback);



module.exports = router;