const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/auth");
const { registerUser, loginUser, forgotPassword, resetPassword, logout, handleRefreshToken } = require("../controllers/authController");

const router = express.Router();


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/refresh").get(handleRefreshToken);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);



module.exports = router;
