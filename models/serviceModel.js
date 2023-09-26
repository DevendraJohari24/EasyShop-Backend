const mongoose = require("mongoose");
const serviceSchema = mongoose.Schema({
    title: {
        type:  String,
        required: [true, "Title should not be empty"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description should not be empty"]        
    },
    iconImg:   {
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

module.exports = mongoose.model("Service", serviceSchema);