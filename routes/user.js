const express = require("express");
const { signUp, signIn, getUsers } = require("../controller/user");
const { isAdmin, auth } = require("../middleware/auth");
const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signin/user").post(signIn);
router.route("/signin/admin").post(signIn);
router.route("/users").get(auth, isAdmin, getUsers);

module.exports = router;
