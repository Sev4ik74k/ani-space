const express = require("express");
const { getAllReviews, addReview } = require("../controllers/reviewController");
const router = express.Router();

router.get("/", getAllReviews);
router.post("/", addReview);

module.exports = router;
