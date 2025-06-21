const express = require("express");
const {
  deleteProducts,
  getProducts,
  addProducts,
  updateProducts,
  getProductDetails,
  getSearchProduct,
  filterProducts,
  getProductsByCategory,
} = require("../controller/product");
const { isAdmin, auth } = require("../middleware/auth");
const router = express.Router();

router.route("/").get(getProducts);
router.route("/search").get(getSearchProduct);
router.route("/category/:id").get(getProductsByCategory);
router.route("/:id").get(getProductDetails);
router.route("/filter").get(filterProducts); // PASS QUERY PARAM TO GET PRODUCTS WITH FILTERS

router.route("/add").post(auth, isAdmin, addProducts);
router.route("/update/:id").put(auth, isAdmin, updateProducts);
router.route("/delete/:id").delete(auth, isAdmin, deleteProducts);

module.exports = router;
