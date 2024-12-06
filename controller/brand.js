const Brand = require("../modals/brand");
const { getPaginationParams } = require("../utils/pagination");
const { validateObjectId } = require("../utils/validateObjectId");

const getBrands = async (req, res) => {
  try {;
    const { page, limit, skip, total } = await getPaginationParams(req, Brand);

    const response = await Brand.find({}).skip(skip).limit(limit);

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

const getBrandsDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // CHECK FOR VALID OBJECT ID
    validateObjectId(req.params.id, res)

    const response = await Brand.findOne({ _id: id });
    if (id) {
      res.status(200).json({ data: response, successful: true });
    } else {
      return res.status(404).json({ message: " Brand not found" });
    }
  } catch (error) {
    console.log({ error });
    res.status(400).json({ message: error, successful: false });
  }
};

const createBrand = async (req, res) => {
  try {
    const response = await Brand.create(req.body);
    res.json({ data: response, successful: true });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

const updateBrand = async (req, res) => {
  try {
    const response = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ data: response, successful: true });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const response = await Brand.findByIdAndDelete(req.params.id);
    if (!response) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json({ data: response, successful: true });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

module.exports = {
  getBrands,
  getBrandsDetails,
  createBrand,
  updateBrand,
  deleteBrand,
};
