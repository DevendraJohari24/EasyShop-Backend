const Slider = require("../models/sliderModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create a Question
exports.createSlider = catchAsyncErrors(async(req, res, next) => {
    req.body.createdBy = req.user.id;
    const slider = await Slider.create(req.body);
    res.status(201).json({
        success: true,
        slider
    })
})


// Get all Service
exports.getAllSliders = async(req, res) => {
    const resultPerPage = 4;
    const slidersCount = await Slider.countDocuments();
    const apiFeature = new  ApiFeatures(
        Slider.find(), req.query).search().filter().pagination(resultPerPage);
    const slideHeader = await apiFeature.query;
    res.status(200).json({
        success: true,
        slideHeader,
        slidersCount
    });
}

