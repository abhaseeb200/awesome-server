const mongoose = require("mongoose");

const connectDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONOGODB_URL);
    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    console.log({ error });
  }
};

module.exports = connectDataBase;
