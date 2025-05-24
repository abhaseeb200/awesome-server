const express = require("express");
const { isAdmin, auth } = require("../middleware/auth");
const {
  getBrands,
  getBrandsDetails,
  createBrand,
  deleteBrand,
  updateBrand,
} = require("../controller/brand");
const router = express.Router();

router.route("/").get(getBrands);
router.route("/:id").get(getBrandsDetails);

router.route("/add").post(auth, isAdmin, createBrand);
router.route("/update/:id").put(auth, isAdmin, updateBrand);
router.route("/delete/:id").delete(auth, isAdmin, deleteBrand);

module.exports = router;
