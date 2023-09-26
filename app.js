const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")
const errorMiddleware = require("./middlewares/error");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middlewares/credentials");


app.use(credentials);
app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb'}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload());

// Route Imports
const authRoutes = require("./routes/authRoute");
const categoryRoutes = require("./routes/categoryRoute");
const productRoutes = require("./routes/productRoute");
const orderRoutes = require("./routes/orderRoute");
const blogRoutes = require("./routes/blogRoute");
const countDownRoutes = require("./routes/countDownRoute");
const featureRoutes = require("./routes/featureRoute");
const feedBackRoutes = require("./routes/feedbackRoute");
const portfolioRoutes =require("./routes/portfolioRoute") ;
const promotionRoutes = require("./routes/promotionRoute");
const questionRoutes = require("./routes/questionRoute");
const serviceRoutes = require("./routes/serviceRoute");
const sliderRoutes = require("./routes/sliderRoute");
const teamRoutes = require("./routes/teamRoute");
const userRoutes = require("./routes/userRoute");


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/countdowns", countDownRoutes);
app.use("/api/v1/features", featureRoutes);
app.use("/api/v1/feedbacks", feedBackRoutes);
app.use("/api/v1/portfolios", portfolioRoutes);
app.use("/api/v1/promotions", promotionRoutes);
app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/sliders", sliderRoutes);
app.use("/api/v1/teams", teamRoutes);
app.use("/api/v1/users", userRoutes);


// Middleware for errors
app.use(errorMiddleware);

module.exports = app;