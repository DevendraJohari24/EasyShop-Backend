const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/auth");
const { getAllTeams, createTeam } = require("../controllers/teamController");

const router = express.Router();


router.route("/").get(getAllTeams);

router.route("/new").post(isAuthenticatedUser, createTeam);

module.exports = router;