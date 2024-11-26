const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        unique: true,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Wishlist", WishlistSchema);
