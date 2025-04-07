const express = require("express");
const { makeAdmin, removeAdmin } = require("../controllers/adminController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.put("/make-admin", verifyToken, isAdmin, makeAdmin);
router.put("/remove-admin", verifyToken, isAdmin, removeAdmin);

module.exports = router;
