const express = require("express");
const { signUp, signIn } = require("../controller/user");
const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signin/user").post(signIn);
router.route("/signin/admin").post(signIn);

module.exports = router;
