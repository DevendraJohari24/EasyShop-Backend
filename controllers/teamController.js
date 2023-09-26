const Team = require("../models/teamModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create a Team
exports.createTeam = catchAsyncErrors(async(req, res, next) => {
    req.body.createdBy = req.user.id;
    const team = await Team.create(req.body);
    res.status(201).json({
        success: true,
        team
    })
})


// Get all Teams
exports.getAllTeams = async(req, res) => {
    const resultPerPage = 4;
    const teamsCount = await Team.countDocuments();
    const apiFeature = new  ApiFeatures(
        Team.find(), req.query).search().filter().pagination(resultPerPage);
    const teams = await apiFeature.query;
    res.status(200).json({
        success: true,
        teams,
        teamsCount
    });
}

