const mongoose = require("mongoose");

// Validates a MongoDB Object ID.
function validateObjectId(id, res) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid product ID", successful: false });
  }
}

module.exports = { validateObjectId };
