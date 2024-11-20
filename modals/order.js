const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "on hold", "cancel", "delivered"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'UserId is required'],
    ref: "User",
    default: "pending",
    enum: ["pending", "on hold", "cancel", "delivered"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);