const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: {
        type:  String,
        required: [true, "Title should not be empty"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description should not be empty"]        
    },
    price: {
        type: Number,
        required: [true, "Price should not be empty"]
    },
    discount: {
        type: Number,
        required: [true, "Discount should not be empty"]
    },
    label: {
        type: String,
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
    images: [
        {
            public_id: {
                type: String,
                required: [true, "Public Id of Image should not be empty"],
            },
            url: {
                type: String,
                required: [true, "URL of Image should not be empty"]
            }
       }
    ],
    category: {
        type:  [String],
        required: [true, "Category should not be empty"],
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        required: [true, "Stock Should not be empty"]
    },
    reviews: [
        { 
            user: {
                type:  mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
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
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
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

module.exports = mongoose.model("Product", productSchema);