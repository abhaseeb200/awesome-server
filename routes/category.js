const express = require("express");
const {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryDetails,
} = require("../controller/category");
const { isAdmin, auth } = require("../middleware/auth");
const router = express.Router();

router.route("/").get(getCategories);
router.route("/:id").get(getCategoryDetails);

router.route("/add").post(auth, isAdmin, addCategory);
router.route("/update/:id").put(auth, isAdmin, updateCategory);
router.route("/delete/:id").delete(auth, isAdmin, deleteCategory);

module.exports = router;
