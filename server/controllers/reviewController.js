const { getAllReviews: fetchAllReviews, addReview: saveReview } = require("../models/reviewBot");

const getAllReviews = async (req, res) => {
    try {
        const reviews = await fetchAllReviews();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

const addReview = async (req, res) => {
    const { username, animeTitle, rating, comment } = req.body;

    if (!username || !animeTitle || !rating || !comment) {
        return res.status(400).json({ message: "Заполните все поля" });
    }

    try {
        const review = await saveReview(username, animeTitle, rating, comment);
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

module.exports = { getAllReviews, addReview };
