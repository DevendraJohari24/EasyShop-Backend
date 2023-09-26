const Portfolio = require("../models/portfolioModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create a Portfolio
exports.createPortfolio = catchAsyncErrors(async(req, res, next) => {
    req.body.createdBy = req.user.id;
    const portfolio = await Portfolio.create(req.body);
    res.status(201).json({
        success: true,
        portfolio
    })
})


// Get all Portfolios
exports.getAllPortfolios = async(req, res) => {
    const resultPerPage = 4;
    const portfoliosCount = await Portfolio.countDocuments();
    const apiFeature = new  ApiFeatures(
        Portfolio.find(), req.query).search().filter().pagination(resultPerPage);
    const portfolio = await apiFeature.query;
    res.status(200).json({
        success: true,
        portfolio,
        portfoliosCount
    });
}

