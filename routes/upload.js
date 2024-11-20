const express = require("express");
const { isAdmin, auth } = require("../middleware/auth");
const upload = require("../config/upload");
const { addImages, getImages, deleteImages } = require("../controller/upload");
const router = express.Router();

router.route("/").get(auth, isAdmin, getImages);
router.route("/add").post(auth, upload.single("image"), addImages);
router.route("/delete/:id").delete(auth, isAdmin, deleteImages);

module.exports = router;
