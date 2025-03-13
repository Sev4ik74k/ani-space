const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");
const { makeAdmin, removeAdmin } = require("../controllers/adminController");

router.put("/make-admin", verifyToken, isAdmin, makeAdmin);
router.put("/remove-admin", verifyToken, isAdmin, removeAdmin);

module.exports = router;
