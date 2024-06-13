const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, "Brand is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  stock: {
    type: Number,
    required: [true, "Stock is required"],
  },
  rating: {
    type: Number,
  },
  thumbnail: {
    type: String,
    required: [true, "Thumbnail is required"],
  },
  images: {
    type: Array,
  },
  discountPercentage: {
    type: Number,
    required: [true, "Discount Percentage is required"],
  },
  variants: {
    type: Object,
    colors: { type: Array, required: true },
    sizes: {
      type: Object,
      size: { type: String, required: true },
      price: { type: Number, required: true },
    },
  },
});

module.exports = mongoose.model("Product", ProductSchema);
