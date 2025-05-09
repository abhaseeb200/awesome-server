const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Title is required"],
    lowercase: true,
    trim: true,
    maxlength: [50, "Title can not be more than 50 characters"],
    minlength: [3, "Title can not be less than 3 characters"],
  },
  description: {
    type: String,
  },
  thumbnail: {
    type: String,
    required: [true, "Thumbnail is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
