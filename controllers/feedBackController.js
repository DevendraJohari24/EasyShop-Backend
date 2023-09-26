const FeedBack = require("../models/feedBackModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create a FeedBack
exports.createFeedback = catchAsyncErrors(async(req, res, next) => {
    req.body.createdBy = req.user.id;
    const feedback = await FeedBack.create(req.body);
    res.status(201).json({
        success: true,
        feedback
    })
})


// Get all FeedBack
exports.getAllFeedbacks = async(req, res) => {
    const resultPerPage = 4;
    const feedbacksCount = await FeedBack.countDocuments();
    const apiFeature = new  ApiFeatures(
        FeedBack.find(), req.query).search().filter().pagination(resultPerPage);
    const feedbacks = await apiFeature.query;
    res.status(200).json({
        success: true,
        feedbacks,
        feedbacksCount
    });
}

