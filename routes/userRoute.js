const express = require("express");
const { getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middlewares/auth");

const router = express.Router();


router.route("/me").get(isAuthenticatedUser , getUserDetails);

router.route("/password/update").put(isAuthenticatedUser , updatePassword);

router.route("/me/update").put(isAuthenticatedUser , updateProfile);

router.route("/admin/users").get(isAuthenticatedUser , getAllUser);

router.route("/me/user/:id").get(isAuthenticatedUser ,  getSingleUser);

router.route("/admin/user/:id").put(isAuthenticatedUser , updateUserRole);

router.route("/admin/user/:id").delete(isAuthenticatedUser ,  deleteUser);



module.exports = router;
