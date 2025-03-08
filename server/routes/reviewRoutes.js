const express = require("express");
const { addReview, getAllReviews } = require("../models/reviewBot");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const reviews = await getAllReviews();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

router.post("/", async (req, res) => {
    const { username, animeTitle, rating, comment } = req.body;

    if (!username || !animeTitle || !rating || !comment) {
        return res.status(400).json({ message: "Заполните все поля" });
    }

    try {
        const review = await addReview(username, animeTitle, rating, comment);
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

module.exports = router;
