const Wishlist = require("../modals/wishlist");
const { getPaginationParams } = require("../utils/pagination");
const { validateObjectId } = require("../utils/validateObjectId");

const getWishlist = async (req, res) => {
  try {
    const { page, limit, skip, total } = await getPaginationParams(
      req,
      Wishlist
    );

    const response = await Wishlist.find({ userId: req.params.userId })
      .skip(skip)
      .limit(limit);

    res.json({
      data: response,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      successful: true,
    });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

// Add to wishlist,
// Remove from wishlist
const toggleWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    let wishlist = await Wishlist.findOne({ userId: userId });

    // Check document ID
    validateObjectId(productId, res)

    if (wishlist) {
      let isExistsProduct = wishlist.products.some(
        (i) => i.product.toString() == productId
      );

      if (isExistsProduct) {
        //Remove from the wishlist if the product is founded
        wishlist.products = wishlist.products.filter(
          (i) => i.product.toString() !== productId
        );
      } else {
        //Add to wishlist if the product is not founded
        wishlist.products.push({ product: productId });
      }

    } else {
      //Create a new wishlist collection
      wishlist = new Wishlist({
        userId: userId,
        products: [{ product: productId }],
      });
    }

    const response = await wishlist.save();

    res.json({ data: response, successful: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error, successful: false });
  }
};

// Remove the entire wishlist products of the specific user 
const clearWishlist = async (req, res) => {
  try {
    // Check document ID
    validateObjectId(req.params.id, res)

    const response = await Wishlist.findByIdAndDelete(req.params.id);
    if (!response) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.status(200).json({ successful: true, message:"Delete successful" });
  } catch (error) {
    res.status(400).json({ message: error, successful: false });
  }
};

module.exports = {
  getWishlist,
  clearWishlist,
  toggleWishlist,
};
