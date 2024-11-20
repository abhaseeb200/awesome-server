const mongoose = require("mongoose");

const UploadSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "URL is required"],
    lowercase: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Upload", UploadSchema);
