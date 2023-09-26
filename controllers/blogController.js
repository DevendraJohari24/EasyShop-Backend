const Blog = require("../models/blogModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create a Blog
exports.createBlog = catchAsyncErrors(async(req, res, next) => {
    req.body.createdBy = req.user.id;
    const blog = await Blog.create(req.body);
    res.status(201).json({
        success: true,
        blog
    })
})


// Get all Blogs
exports.getAllBlogs = async(req, res) => {
    const resultPerPage = 20;
    const blogsCount = await Blog.countDocuments();
    const apiFeature = new  ApiFeatures(
        Blog.find(), req.query).search().filter().pagination(resultPerPage);
    const blogs = await apiFeature.query;
    res.status(200).json({
        success: true,
        blogs,
        blogsCount
    });
}

