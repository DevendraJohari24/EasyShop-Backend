const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const sendToken = async(user, statusCode, req, res) => {
    const cookies = req.cookies;
    const accessToken = await user.getJWTToken();
    const newRefreshToken = await user.getRefreshToken();
    let newRefreshTokenArray = !cookies?.jwt ? user.refreshToken : user.refreshToken.filter(rt => rt !== cookies.jwt);
    
    if (cookies?.jwt) {
        const refreshToken = cookies.jwt;
        const foundToken = await User.findOne({ refreshToken }).exec();
        if (!foundToken) {
            newRefreshTokenArray = [];
        }
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    }

    user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await user.save();

    res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

    res.status(statusCode).json({ 
        accessToken,
        user: user._id
     });
}




module.exports = sendToken;