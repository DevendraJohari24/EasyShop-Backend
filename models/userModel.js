const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please Enter Your First Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"]
    },
    lastname: {
        type: String,
        required: [true, "Please Enter Your Last Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    phone: {
        type: String,
        unique: true,
    },
    description: {
        type: String
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        // minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    refreshToken: [String],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});


// JWT TOKEN
userSchema.methods.getJWTToken = function (){
    return jwt.sign({
        "UserInfo": {
            user: this._id,
            roles: this.role
        }
     }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}


// Refresh TOKEN
userSchema.methods.getRefreshToken = function (){
    return jwt.sign(
        {
        user: this._id
    },
    process.env.REFRESH_TOKEN_SECRET, 
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE
    });
}


// Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    const isMatched = await bcrypt.compare(enteredPassword, this.password);
    return isMatched;
    // return await bcrypt.compare(enteredPassword, this.password);
}

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken;
}

module.exports = mongoose.model("User", userSchema);