const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary");
const DatauriParser = require("datauri/parser");
var path = require('path');


exports.registerUser = catchAsyncErrors(async(req, res, next) => {
    var newUserData = {};
    if(!req.files){
        console.log("No File");
    }
    else{
        const parser = new DatauriParser();
        const extName = path.extname(req.files.avatar.name).toString()
        const file64 = parser.format(extName, req.files.avatar.data);
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
    const {firstname, lastname, email, password, description,  phone} = req.body;
    newUserData.firstname = firstname;
    newUserData.lastname = lastname;
    newUserData.email = email;
    newUserData.password = password;
    newUserData.description = description;
    newUserData.phone = phone;
    
    const user = await User.create(newUserData);
    sendToken(user, 201, req, res);
});



exports.loginUser = catchAsyncErrors(async(req, res, next) => {

    const {email, password} = req.body;
    console.log("User");
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password" ));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password"));
    }

    console.log("User Logined");
    sendToken(user, 200, req, res);
});



exports.logout = catchAsyncErrors(async (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.status(204).json({
            success: true,
            message: "No Token....Logged Out Successfully"
        });
    } 
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return  res.status(204).json({
            success: true,
            message: "No User Found...Logged Out Successfully"
        });
    }

    foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);;
    const result = await foundUser.save();
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    console.log("Logged out");
    res.status(204).json({
        success: true,
        message: "Logged Out Successfully"
    });

    
});


exports.handleRefreshToken = catchAsyncErrors(async(req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.jwt){
        return next(new ErrorHandler("Jwt Token not found",  401));
    }
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err){
                    return next(new ErrorHandler("Forbidden Token", 403))
                }
                const hackedUser = await User.findOne({ _id: decoded.user }).exec();
                hackedUser.refreshToken = [];
                const result = await hackedUser.save();
            }
        )
        return next(new ErrorHandler("Forbidden", 403));
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
                foundUser.refreshToken = [...newRefreshTokenArray];
                const result = await foundUser.save();
            }
            if (err || foundUser._id !== decoded.user) {
                return next( new ErrorHandler("Expired Refresh Token", 403))
            }
            sendToken(foundUser, 201, req, res);
        }
    );
})




exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }
    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false});

    const resetPasswordUrl = `
    ${process.env.FRONTEND_URL}user/password/reset/${resetToken}`;

    const message = `Your password reset token is : - \n\n ${resetPasswordUrl}
    \n\n If you have not requested this email then, please ignore it`

    try{
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message: message
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        });
    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(error.message, 500));
    }
});




exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    console.log(req.body);
    console.log(req.params);
    // Creating Token Hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()},
    });

    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match", 400))
    }

    user.password = req.body.newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, req, res);
});







