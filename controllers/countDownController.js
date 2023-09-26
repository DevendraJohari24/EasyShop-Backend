const CountDown = require("../models/countDownModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create a Countdown
exports.createCountDown = catchAsyncErrors(async(req, res, next) => {
    req.body.createdBy = req.user.id;
    const countdown = await CountDown.create(req.body);
    res.status(201).json({
        success: true,
        countdown
    })
})


// Get all Countdowns
exports.getAllCountDown = async(req, res) => {
    const resultPerPage = 1;
    const countDownCount = await CountDown.countDocuments();
    const apiFeature = new  ApiFeatures(
        CountDown.find(), req.query).search().filter().pagination(resultPerPage);
    const countdown = await apiFeature.query;
    res.status(200).json({
        success: true,
        countdown,
        countDownCount
    });
}

