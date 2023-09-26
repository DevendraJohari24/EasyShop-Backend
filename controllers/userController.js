const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary");
const DatauriParser = require("datauri/parser");
var path = require('path');

//  Get User Detail
exports.getUserDetails = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.userId);
    res.status(200).json({
        success: true,
        user
    })
})


//  Get User Password
exports.updatePassword = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.userId).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.currentPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is Incorrect", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
});

// Update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    var newUserData = {}
    if(!req.files){
        console.log("No File");
    }
    else{
        const parser = new DatauriParser();
        const extName = path.extname(req.files.file.name).toString()
        const file64 = parser.format(extName, req.files.file.data);
        const myCloud = await cloudinary.v2.uploader.upload(file64.content, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        });

        newUserData.avatar =  {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
    }

    if(req.body.hasOwnProperty("name")){
        newUserData.name = req.body.name;
    }
    if(req.body.hasOwnProperty("summary")){
        newUserData.summary = req.body.summary;
    }
    
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
   res.status(200).json({
    success: true,
    message: "Profile Updated Successfully"
   })
});

// Get All Users
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    
    res.status(200).json({
        success: true,
        users
    })
});


// Get single User (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user
    })
});




// Update user role
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        roles: req.body.roles
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
   res.status(200).json({
    success: true,
    message: "Role Updated Successfully"
   })
});


// Delete User --admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

   const user = await User.findById(req.params.id);

   if(!user){
    return next(new ErrorHandler(`User does not exist with ID ${req.params.id}`));
   }

   await User.findByIdAndDelete(req.params.id);

   res.status(200).json({
    success: true,
    message: "User Deleted Successfully"
   })
});
