const Question = require("../models/questionModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create a Question
exports.createQuestion = catchAsyncErrors(async(req, res, next) => {
    req.body.createdBy = req.user.id;
    const question = await Question.create(req.body);
    res.status(201).json({
        success: true,
        question
    })
})


// Get all Questions
exports.getAllQuestions = async(req, res) => {
    const resultPerPage = 4;
    const questionsCount = await Question.countDocuments();
    const apiFeature = new  ApiFeatures(
        Question.find(), req.query).search().filter().pagination(resultPerPage);
    const questions = await apiFeature.query;
    res.status(200).json({
        success: true,
        questions,
        questionsCount
    });
}

