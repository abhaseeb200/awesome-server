const Category = require("../modals/category");
const { getPaginationParams } = require("../utils/pagination");
const { validateObjectId } = require("../utils/validateObjectId");

const getCategories = async (req, res) => {
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
    const filter = searchQuery ? { title: { $regex: searchQuery, $options: "i" } } : {} 
    const response = await Category.find(filter).sort(sortOptions).skip(skip).limit(limit);
    const total = await Category.countDocuments(filter);

    res.json({
      data: response,
      skip: skip,
      page: page,
      limit: limit,
      total: total,
      successful: true,
    });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

const getCategoryDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // CHECK FOR VALID OBJECT ID
    validateObjectId(req.params.id, res);

    const response = await Category.findOne({ _id: id });
    if (id) {
      res.status(200).json({ data: response, successful: true });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log({ error });
    res.status(400).json({ message: error, successful: false });
  }
};

const addCategory = async (req, res) => {
  try {
    const response = await Category.create(req.body);
    res.json({ data: response, successful: true });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

const updateCategory = async (req, res) => {
  try {
    const response = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ data: response, successful: true });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const response = await Category.findByIdAndDelete(req.params.id);
    if (!response) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ data: response, successful: true });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

module.exports = {
  getCategories,
  getCategoryDetails,
  addCategory,
  updateCategory,
  deleteCategory,
};
