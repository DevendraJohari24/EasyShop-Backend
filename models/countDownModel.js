const mongoose = require("mongoose");

const countDownSchema = mongoose.Schema({
    title1: {
        type:  String,
        required: [true, "Title 1 should not be empty"],
        trim: true,
    },
    title2: {
        type:  String,
        required: [true, "Title should 2 not be empty"],
        trim: true,
    },
    subtitle: {
        type:  String,
        required: [true, "Subtitle should not be empty"],
        trim: true,
    },
    image:   {
        public_id: {
            type: String,
            required: [true, "Public Id of Image should not be empty"],
        },
        url: {
            type: String,
            required: [true, "URL of Image should not be empty"]
        }
   },
    createdBy: {
        type:  mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Countdown", countDownSchema);