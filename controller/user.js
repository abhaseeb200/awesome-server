const User = require("../modals/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Controller to create a new account
// Remember: Admin has only one account and user has multiple
const signUp = async (req, res) => {
  if (req.body.password.length < 6) {
    return res.status(400).json({
      message: "Password can not be less than 6 char.",
      successful: false,
    });
  }

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.role = "user"; //should be 'admin' if don't have any admin account.
    const user = await User.create(req.body);

    const token = await jwt.sign(
      { role: req.body.role },
      process.env.JWT_SECRET
    );

    res.json({ data: user, token: token, successful: true });
  } catch (error) {
    res.status(400).json({ error, successful: false });
  }
};

// Controller to login the user and admin
const signIn = async (req, res) => {
  const { email, password } = req.body;

  // Protect the admin account from normal users
  const isAdminRoute = req.path.includes("/admin");

  try {
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      return res.status(401).json({
        message: "User not found.",
        successful: false,
      });
    }

    if (isAdminRoute && findUser.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. You are not admin",
        successful: false,
      });
    }

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Incorrect password", successful: false });
    }

    const token = await jwt.sign(
      { role: findUser.role },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token: token, data: findUser, successful: true });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const response = await User.find().where({ role: "user" });
    res.status(200).json({ data: response, successful: true });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { signUp, signIn, getUsers };
