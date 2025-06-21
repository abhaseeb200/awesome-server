const Product = require("../modals/product");
const { getPaginationParams } = require("../utils/pagination");
const { validateObjectId } = require("../utils/validateObjectId");

//REMEMBER: There is no need of Attributes or Variants for now...
const getProducts = async (req, res) => {
  try {
    const { page, limit, skip } = await getPaginationParams(req);
    // SEARCH QUERY
    const searchQuery = req.query.q;

    // SORTING QUERY DEFAULTS
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    // SORTING QUERY OPTIONS
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder;

    // $options USED FOR CASE-INSENSITIVE
    // $regex USED FOR NON-EXACT MATCH
    const filter = searchQuery
      ? { title: { $regex: searchQuery, $options: "i" } }
      : {};
    const response = await Product.find(filter)
      .populate("category")
      .populate("brand")
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);
    const total = await Product.countDocuments(filter);

    res.json({
      data: response,
      skip: skip,
      page: page,
      limit: limit,
      total: total,
      successful: true,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message, stack: error.stack, successful: false });
  }
};

const getSearchProduct = async (req, res) => {
  try {
    const { page, limit, skip, total } = await getPaginationParams(
      req,
      Product
    );

    // Regular expression for case-insensitive matching
    const regex = new RegExp(req.query.q, "i");

    // Search across multiple fields using $text
    const response = await Product.find({ $text: { $search: regex } })
      .populate("category")
      .populate("brand")
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
    validateObjectId(req.params.id, res);

    const findProduct = await Product.findById({ _id: req.params.id })
      .populate("category")
      .populate("brand");
      
    if (!findProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ data: findProduct, successful: true });
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: error });
  }
};

const addProducts = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    // Populate the category field with the full category document
    const response = await savedProduct.populate("category").populate("brand");
    res.status(200).json({ data: response, successful: true });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

const updateProducts = async (req, res) => {
  try {
    const response = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //new parameter will return the data after updated
    }).populate("category").populate("brand");
    res.status(200).json({ data: response, successful: true });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

const deleteProducts = async (req, res) => {
  try {
    // CHECK FOR VALID OBJECT ID
    validateObjectId(req.params.id, res);

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

const getProductsByCategory = async (req, res) => {
  try {
    // CHECK FOR VALID OBJECT ID
    validateObjectId(req.params.id, res);

    const { page, limit, skip, total } = await getPaginationParams(
      req,
      Product
    );

    const response = await Product.find({ category: req.params.id })
      .populate("category") //there only need of their name and id
      .populate("brand") //there only need of their name and id
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      data: response,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      // skip: skip,
      // limit: limit,
      count: response.length,
    });
  } catch (error) {
    res.status(400).json({ message: error });
    console.log(error);
  }
};

const getProductsByBrand = async (req, res) => {
  try {
    // CHECK FOR VALID OBJECT ID
    validateObjectId(req.params.id, res);

    const { page, limit, skip, total } = await getPaginationParams(
      req,
      Product
    );

    const response = await Product.find({ brand: req.params.id })
      .populate("category") //there only need of their name and id
      .populate("brand") //there only need of their name and id
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      data: response,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      count: response.length,
    });
  } catch (error) {
    res.status(400).json({ message: error });
    console.log(error);
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
  getProductsByCategory,
  getProductsByBrand,
};
