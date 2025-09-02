const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    
    category: {
      type: String,
      required: true
    },

    description: {
        type: String,
        required: true
    },

    rating: {
        rate: {
                type: String,
                enum: ["poor", "average", "good", "excellent"],
                default: "good"
        },
        count: {
                type: Number,
                required: true
        }
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
