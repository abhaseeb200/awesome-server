const Product = require("../modals/product");
const Category = require("../modals/category");

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
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
      limit: response.length,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getSearchProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    console.log(req.query.q, "SEARCH");
    const total = await Product.countDocuments();
    const response = await Product.find({ brand:"oppo" })
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
      limit: response.length,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // CHECK FOR VALID OBJECT ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: "Invalid product ID", successful: false });
    }

    const response = await Product.findOne({ _id: id });
    if (id) {
      res.status(200).json({ data: response, successful: true });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log({ error });
    res.status(400).json({ message: error });
  }
};

const addProducts = async (req, res) => {
  try {
    const product = new Product(req.body);
    let { images, thumbnail } = product;
    images.unshift(thumbnail);
    const response = await product.save();
    res.status(200).json({ data: response, successful: true });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

const updateProducts = async (req, res) => {
  try {
    const response = await Product.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ data: response, successful: true });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const response = await Category.findByIdAndDelete(req.params.id);
    if (!response) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ successful: true });
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
};
