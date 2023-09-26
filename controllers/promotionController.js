const Promotion = require("../models/promotionModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create a Portfolio
exports.createPromotion = catchAsyncErrors(async(req, res, next) => {
    req.body.createdBy = req.user.id;
    const promotion = await Promotion.create(req.body);
    res.status(201).json({
        success: true,
        promotion
    })
})


// Get all Promotions
exports.getAllPromotions = async(req, res) => {
    const resultPerPage = 4;
    const promotionsCount = await Promotion.countDocuments();
    const apiFeature = new  ApiFeatures(
        Promotion.find(), req.query).search().filter().pagination(resultPerPage);
    const promotions = await apiFeature.query;
    res.status(200).json({
        success: true,
        promotions,
        promotionsCount
    });
}

