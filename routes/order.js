const express = require("express");
const { isAdmin, auth } = require("../middleware/auth");
const {
  createOrder,
  updateOrder,
  getAllOrders,
  getCustomerOrders,
  deleteOrder,
} = require("../controller/order");
const router = express.Router();

router.route("/customer/:userId").get(auth, getCustomerOrders);
// router.route("/customer/:userId/:id").put(auth, getOrderDetails);
router.route("/admin").get(auth, isAdmin, getAllOrders);
router.route("/add").post(auth, createOrder);
router.route("/update/:id").put(auth, isAdmin, updateOrder);
router.route("/delete/:id").delete(auth, isAdmin, deleteOrder);

module.exports = router;
