const express = require("express");
const {
  deleteProducts,
  getProducts,
  addProducts,
  updateProducts,
  getProductDetails,
  getSearchProduct,
} = require("../controller/product");
const { isAdmin, auth } = require("../middleware/auth");
const router = express.Router();

router.route("/").get(getProducts);
router.route("/search").get(getSearchProduct);
router.route("/:id").get(getProductDetails);
router.route("/add").post(auth, isAdmin, addProducts);
router.route("/update/:id").put(updateProducts);
router.route("/delete/:id").delete(deleteProducts);

module.exports = router;
