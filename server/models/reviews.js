const pool = require("../db");

const createReviewTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) NOT NULL,
      anime_title VARCHAR(255) NOT NULL,
      rating INTEGER CHECK (rating >= 1 AND rating <= 10),
      comment TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

    try {
        await pool.query(query);
        console.log("The reviews table has been created");
    } catch (err) {
        console.error("Error while creating the table:", err);
    }
};

createReviewTable();

module.exports = {
    async addReview(username, animeTitle, rating, comment) {
        const res = await pool.query(
            "INSERT INTO reviews (username, anime_title, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *, created_at",
            [username, animeTitle, rating, comment]
        );
        return res.rows[0];
    },

    async getAllReviews() {
        const res = await pool.query("SELECT * FROM reviews ORDER BY created_at DESC");
        return res.rows;
    },
};
