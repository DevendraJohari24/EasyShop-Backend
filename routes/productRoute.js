const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middlewares/auth");

const router = express.Router();

router.route("/").get(getAllProducts);

router.route("/new").post(isAuthenticatedUser , createProduct);

router.route("/product/:id").put(isAuthenticatedUser , updateProduct);

router.route("/product/:id").delete( isAuthenticatedUser, deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review/new").put(isAuthenticatedUser, createProductReview);

router.route("/reviews").get(getProductReviews);

router.route("/reviews").delete(isAuthenticatedUser, deleteReview);


module.exports = router;