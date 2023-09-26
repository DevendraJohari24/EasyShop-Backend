const Service = require("../models/serviceModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create a Question
exports.createService = catchAsyncErrors(async(req, res, next) => {
    req.body.createdBy = req.user.id;
    const service = await Service.create(req.body);
    res.status(201).json({
        success: true,
        service
    })
})


// Get all Service
exports.getAllServices = async(req, res) => {
    const resultPerPage = 4;
    const servicesCount = await Service.countDocuments();
    const apiFeature = new  ApiFeatures(
        Service.find(), req.query).search().filter().pagination(resultPerPage);
    const services = await apiFeature.query;
    res.status(200).json({
        success: true,
        services,
        servicesCount
    });
}

