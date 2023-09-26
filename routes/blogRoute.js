const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/auth");
const { getAllBlogs, createBlog } = require("../controllers/blogController");

const router = express.Router();


router.route("/").get( getAllBlogs);

router.route("/new").post(isAuthenticatedUser, createBlog);



module.exports = router;