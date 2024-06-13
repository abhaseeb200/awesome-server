require("dotenv").config();
const express = require("express");
const connectDataBase = require("./config/db");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");

const app = express();
const PORT = process.env.PORT;

// Welcome notes!
app.get("/", (req, res) => {
  res.send("Welcome to Awesome-Server");
});

// Middleware to parse JSON bodies
app.use(express.json());

//define routes
app.use("/", userRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running,and App is listening on port " + PORT
    );
    connectDataBase();
  } else console.log("Error occurred, server can't start", error);
});
