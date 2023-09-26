const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

exports.createCategory = catchAsyncErrors(async(req, res, next) => {
    req.body.user = req.user.id;
    const category = await Category.create(req.body);
    res.status(201).json({
        success: true,
        category
    })
})


// Get all Categories
exports.getAllCategories = async(req, res) => {
    const resultPerPage = 5;
    const categoryCount = await Category.countDocuments();
    const apiFeature = new  ApiFeatures(
        Category.find(), req.query).search().filter().pagination(resultPerPage);
    const categories = await apiFeature.query;
    res.status(200).json({
        success: true,
        categories,
        categoryCount
    });
}



exports.getCategoryDetails = catchAsyncErrors(async(req, res, next) => {
    const category = await Category.findById(req.params.id);

    if(!category){
        return next(new ErrorHandler("Category Not Found", 404));
    }
    res.status(200).json({
        success: true,
        category
    });
})

exports.getCategoryDetailsByName = catchAsyncErrors(async(req, res, next) => {
    const category = await Category.findOne({name: req.body.name});
    if(!category){
        return next(new ErrorHandler("Category Not Found", 404));
    }
    res.status(200).json({
        success: true,
        category
    });
})

exports.getAllProductsByCategoryName = catchAsyncErrors(async(req, res, next) => {
    const products = await Product.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category_details",
            },
        },
        {
            $match: {
                "category_details.name": req.params.categoryName
            }
        }
    ]);
    if(!products){
        return next(new ErrorHandler("Product Not Found", 404));
    }
    res.status(200).json({
        success: true,
        products
    });
})