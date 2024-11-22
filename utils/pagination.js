const getPaginationParams = async (req, model) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await model.countDocuments();
    return { page, limit, skip, total };
  };
  
  module.exports = { getPaginationParams };
  