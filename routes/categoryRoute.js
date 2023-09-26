const express = require("express");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const { getAllCategories, createCategory, getAllProductsByCategoryName } = require("../controllers/categoryController");

const router = express.Router();


router.route("/categories").get( getAllCategories);

router.route("/categories/:categoryName/products").get(getAllProductsByCategoryName);

router.route("/admin/category/new").post(isAuthenticatedUser , createCategory);


module.exports = router;