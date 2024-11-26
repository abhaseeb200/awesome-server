const Order = require("../modals/order");
const { validateObjectId } = require("../utils/validateObjectId");

/*
SECURITY ALERT:
1. What if other user_id are stolen they will check, and create
order of their user even you have your own or their JWT token

2. While create a new order, What if user send the incorrect 
amount of product in the request
*/

// Get all orders list for the admin only
const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Order.countDocuments();
    const response = await Order.find({}).skip(skip).limit(limit);

    res.json({
      data: response,
      skip: skip,
      page: page,
      limit: response.length,
      total: total,
      successful: true,
    });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

// Customer can access only their own orders
// This order will be secure from other customers
const getCustomerOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Order.countDocuments();
    const response = await Order.find({ userId: req.params.userId })
      .skip(skip)
      .limit(limit);

    res.json({
      data: response,
      skip: skip,
      page: page,
      limit: response.length,
      total: total,
      successful: true,
    });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

//This API is on hold... because their is no need
const getOrderDetails = async (req, res) => {
  try {
    // CHECK FOR VALID OBJECT ID
    validateObjectId(req.params.id, res)

    const findOrder = await Order.findById({ _id: req.params.id });

    if (!findOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ data: findOrder, successful: true });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// Customer and Admin can create orders
// Passing the userId to secure and get their own order
// REMEMBER: Don't send total_price & status from request
const createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;
    let totalPrice = 0;
    items.forEach((i) => (totalPrice += i?.price * i?.quantity));
    const response = await new Order({ userId, items, totalPrice }).save();

    res.json({ data: response, successful: true });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

// Only Admin can update orders status
const updateOrder = async (req, res) => {
  try {
    const response = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ data: response, successful: true });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

// Only Admin can delete orders
const deleteOrder = async (req, res) => {
  try {
    // CHECK FOR VALID OBJECT ID
    validateObjectId(req.params.id, res)

    const response = await Order.findByIdAndDelete(req.params.id);
    
    if (!response) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message:"Delete order successful", successful: true });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

module.exports = {
  getAllOrders,
  getCustomerOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
