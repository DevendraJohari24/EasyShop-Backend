const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
    name: {
        type:  String,
        required: [true, "Name should not be empty"],
        trim: true,
    },
    position: {
        type: String,
        required: [true, "Position should not be empty"]        
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

module.exports = mongoose.model("Team", teamSchema);