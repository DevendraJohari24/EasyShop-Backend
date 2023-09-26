const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')){
        return next(new ErrorHandler("Invalid Headers", 401))
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if (err){
                return next(new ErrorHandler("Invalid Token", 403))
            }
            console.log(decoded);
            req.userId = decoded.UserInfo.user;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
});

