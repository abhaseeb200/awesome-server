const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  fullName: {
    type: String,
    required: [true, "Full-Name is required"],
    lowercase: true,
    trim: true,
    minLength: [3, "Full Name is to short."],
  },
  phoneNumber: {
    type: String,
    minLength: [10, "Phone Number is to short."],
    trim: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
