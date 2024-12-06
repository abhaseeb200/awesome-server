const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
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
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  attributes: {
    colors: [
      {
        color: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
    sizes: [
      {
        size: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
});

// Update the updatedAt field automatically on save
ProductSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Perform a full-text search across multiple fields
ProductSchema.index({ title: 'text', brand: 'text' });

module.exports = mongoose.model("Product", ProductSchema);
