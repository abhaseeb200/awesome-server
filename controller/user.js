const User = require("../modals/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Sign-up controller to create a new user
const signUp = async (req, res) => {
  let { password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({
      message: "Password can not be less than 6 char.",
      successful: false,
    });
  }
  try {
    password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create(req.body);
    res.json({ data: user, successful: true });
  } catch (error) {
    console.log({ error });
    res.status(400).json({ error, successful: false });
  }
};

// Sign-In controller to login the user
const signIn = async (req, res) => {
  const { email, password } = req.body;
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
    res.status(200).json({ token: token, successful: true });
  } catch (error) {
    console.log({ error });
    res.status(400).json({ error });
  }
};

module.exports = { signUp, signIn };
