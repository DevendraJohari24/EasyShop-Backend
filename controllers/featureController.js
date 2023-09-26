const Feature = require("../models/featureModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create a Feature
exports.createFeature= catchAsyncErrors(async(req, res, next) => {
    req.body.createdBy = req.user.id;
    const feature = await Feature.create(req.body);
    res.status(201).json({
        success: true,
        feature
    })
})


// Get all Features
exports.getAllFeatures = async(req, res) => {
    const resultPerPage = 4;
    const featuresCount = await Feature.countDocuments();
    const apiFeature = new  ApiFeatures(
        Feature.find(), req.query).search().filter().pagination(resultPerPage);
    const features = await apiFeature.query;
    res.status(200).json({
        success: true,
        features,
        featuresCount
    });
}

