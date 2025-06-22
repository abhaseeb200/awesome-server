require("dotenv").config();
const express = require("express");
const cors = require('cors')
const connectDataBase = require("./config/db");

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const uploadRoutes = require("./routes/upload");
const orderRoutes = require("./routes/order");
const wishlistRoutes = require("./routes/wishlist");

const app = express();
app.use(cors())
const PORT = process.env.PORT;

// Welcome for testing purpose
app.get("/", (req, res) => {
  res.send("Welcome to Awesome-Server");
});

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.use("/", userRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/brands", brandRoutes);
app.use("/uploads", uploadRoutes);
app.use("/orders", orderRoutes);
app.use("/wishlist", wishlistRoutes);

// Serve the "uploads" folder
app.use('/uploads', express.static('uploads'));

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running,and App is listening on port " + PORT
    );
    connectDataBase();
  } else console.log("Error occurred, server can't start", error);
});
