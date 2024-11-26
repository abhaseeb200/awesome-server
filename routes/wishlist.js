const express = require("express");
const { auth } = require("../middleware/auth");
const {
  getWishlist,
  clearWishlist,
  toggleWishlist,
} = require("../controller/wishlist");
const router = express.Router();

router.route("/:userId").get(auth, getWishlist);
router.route("/addAndRemove").post(auth, toggleWishlist);
router.route("/clear/:id").delete(auth, clearWishlist);

module.exports = router;
