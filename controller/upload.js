const fs = require('fs');
const path = require('path');
const Upload = require("../modals/upload");

const getImages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Upload.countDocuments();
    const response = await Upload.find({}).skip(skip).limit(limit);

    res.json({
      data: response,
      skip: skip,
      page: page,
      count: response.length,
      limit: limit,
      total: total,
      successful: true,
    });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

const addImages = async (req, res) => {
  try {
    // Replace the double slash '//' into single '\'
    const filePath = req.file.path.replace(/\\/g, "/");

    const newImage = new Upload({
      url: filePath,
      name: req.file.originalname,
    });
    const response = await newImage.save();
    res.json({ data: response, successful: true });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

const deleteImages = async (req, res) => {
  try {
    const response = await Upload.findByIdAndDelete(req.params.id);
    if (!response) {
      return res
        .status(404)
        .json({ message: "Image not found", successful: false });
    }

    // Delete the image file from the server
    const filePath = path.resolve(response?.url);
    await fs.promises.unlink(filePath);

    res.status(200).json({ data: response, successful: true });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

module.exports = {
  getImages,
  addImages,
  deleteImages,
};
