const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await prisma.review.findMany({
            orderBy: { createdAt: "desc" },
        });

        res.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.addReview = async (req, res) => {
    const { username, animeTitle, rating, comment } = req.body;

    if (!username || !animeTitle || !rating || !comment) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (rating < 1 || rating > 10) {
        return res.status(400).json({ message: "Rating must be between 1 and 10" });
    }

    try {
        const newReview = await prisma.review.create({
            data: {
                username,
                animeTitle,
                rating,
                comment,
            },
        });

        res.status(201).json(newReview);
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: "Server error" });
    }
};
