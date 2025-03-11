const pool = require("../db");

const getAllAnime = async (req, res) => {
    try {
        const animeList = await pool.query("SELECT * FROM anime");
        res.json(animeList.rows);
    } catch (error) {
        console.error("Ошибка при получении списка аниме:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

const getAnimeBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const anime = await pool.query("SELECT * FROM anime WHERE slug = $1", [slug]);
        if (!anime.rows.length) {
            return res.status(404).json({ message: "Аниме не найдено" });
        }
        res.json(anime.rows[0]);
    } catch (error) {
        console.error("Ошибка при получении аниме:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

const getOngoingAnime = async (req, res) => {
    try {
        const ongoingAnime = await pool.query("SELECT * FROM anime WHERE status = 'ongoing'");
        res.json(ongoingAnime.rows);
    } catch (error) {
        console.error("Ошибка при получении онгоингов:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

const addAnime = async (req, res) => {
    const { image_url, title, description, release_year, status, slug, genres, type } = req.body;
    try {
        const newAnime = await pool.query(
            `INSERT INTO anime (image_url, title, description, release_year, status, slug, genres, type) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [image_url, title, description, release_year, status, slug, genres, type]
        );
        res.status(201).json(newAnime.rows[0]);
    } catch (error) {
        console.error("Ошибка при добавлении аниме:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

const rateAnime = async (req, res) => {
    const { slug } = req.params;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 10) {
        return res.status(400).json({ message: "Рейтинг должен быть от 1 до 10" });
    }

    try {
        const updatedAnime = await pool.query(
            `UPDATE anime 
             SET rating = CASE 
                 WHEN rating IS NULL THEN $1 
                 ELSE (rating * rating_count + $1) / (rating_count + 1) 
             END,
             rating_count = rating_count + 1
             WHERE slug = $2
             RETURNING *`,
            [rating, slug]
        );

        if (!updatedAnime.rows.length) {
            return res.status(404).json({ message: "Аниме не найдено" });
        }

        res.json(updatedAnime.rows[0]);
    } catch (error) {
        console.error("Ошибка при оценке аниме:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

module.exports = { getAllAnime, getAnimeBySlug, getOngoingAnime, addAnime, rateAnime };
