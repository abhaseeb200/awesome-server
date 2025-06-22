// netlify/functions/api.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const connectDataBase = require("../../config/db");
const userRoutes = require("../../routes/user");
const productRoutes = require("../../routes/product");
const categoryRoutes = require("../../routes/category");
const brandRoutes = require("../../routes/brand");
const uploadRoutes = require("../../routes/upload");
const orderRoutes = require("../../routes/order");
const wishlistRoutes = require("../../routes/wishlist");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Match the redirect path
app.get("/api", (req, res) => {
  res.send("Welcome to Awesome-Server");
});

app.use("/api", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);

// Serve static files
const path = require("path");
app.use(
  "/api/uploads",
  express.static(path.join(__dirname, "../../uploads"))
);

// Connect DB
connectDataBase();

module.exports.handler = serverless(app);
