const express = require("express");
const { getUserByUsername } = require("../controllers/userController");
const upload = require("../middleware/uploadMiddleware");
const { verifyToken } = require("../middleware/authMiddleware");
const { updateAvatar } = require("../controllers/userController");

const router = express.Router();

router.get("/:username", getUserByUsername);
router.post("/upload-avatar", verifyToken, upload.single("avatar"), updateAvatar);

module.exports = router;
