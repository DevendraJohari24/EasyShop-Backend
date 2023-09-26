const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/auth");
const { getAllQuestions, createQuestion } = require("../controllers/questionController");

const router = express.Router();


router.route("/").get(getAllQuestions);

router.route("/new").post(isAuthenticatedUser, createQuestion);



module.exports = router;