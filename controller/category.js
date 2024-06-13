const Category = require("../modals/category");

const getCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const total = await Category.countDocuments();
    const response = await Category.find({}).skip(skip).limit(limit);
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

const getCategoryDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // CHECK FOR VALID OBJECT ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: "Invalid Category ID", successful: false });
    }

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
