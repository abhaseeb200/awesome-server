const mongoose = require("mongoose");
const Product = require("../modals/product");

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await Product.countDocuments();
    const query = req.query.category ? { category: req.query.category } : {};
    const response = await Product.find(query)
      .populate("category")
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      data: response,
      page: page,
      skip: skip,
      total: total,
      limit: limit,
      count: response.length,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getSearchProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    // Regular expression for case-insensitive matching
    const regex = new RegExp(req.query.q, "i");
    const total = await Product.countDocuments();

    // Search across multiple fields using $text
    const response = await Product.find({ $text: { $search: req.query.q } })
      .populate("category")
      .skip(skip)
      .limit(limit);

    if (!response) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      data: response,
      page: page,
      skip: skip,
      total: total,
      limit: limit,
      count: response.length,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getProductDetails = async (req, res) => {
  try {
    // CHECK FOR VALID OBJECT ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(404)
        .json({ message: "Invalid product ID", successful: false });
    }

    const findProduct = await Product.findById({ _id: req.params.id });

    if (!findProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ data: findProduct, successful: true });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const addProducts = async (req, res) => {
  try {
    const product = new Product(req.body);
    let { images, thumbnail } = product;
    images.unshift(thumbnail);
    const savedProduct = await product.save();
    // Populate the category field with the full category document
    const response = await savedProduct.populate("category");
    res.status(200).json({ data: response, successful: true });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

const updateProducts = async (req, res) => {
  try {
    const response = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //new parameter will return the data after updated
    }).populate("category");
    res.status(200).json({ data: response, successful: true });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

const deleteProducts = async (req, res) => {
  try {
    // CHECK FOR VALID OBJECT ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(404)
        .json({ message: "Invalid product ID", successful: false });
    }

    const response = await Product.findByIdAndDelete(req.params.id);
    if (!response) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ successful: true });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

// WORKING ON IT...
// PLEASE PASS QUERY PARAMS
const filterProducts = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ data: "here is filter data", successful: true });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

module.exports = {
  getProducts,
  getProductDetails,
  addProducts,
  updateProducts,
  deleteProducts,
  getSearchProduct,
  filterProducts,
};
