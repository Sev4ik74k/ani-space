const pool = require("../db");

const createAnimeTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS anime (
            id SERIAL PRIMARY KEY,
            image_url TEXT NOT NULL,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            rating NUMERIC(3,1) DEFAULT NULL,
            rating_count INTEGER DEFAULT 0,
            release_year INTEGER NOT NULL,
            status VARCHAR(20) CHECK (status IN ('ongoing', 'released', 'announced')) NOT NULL,
            slug VARCHAR(255) UNIQUE NOT NULL,
            genres TEXT[] NOT NULL,
            type VARCHAR(20) CHECK (type IN ('series', 'movie')) NOT NULL
            )`;

    try {
        await pool.query(query);
        console.log("The anime table has been created");
    } catch (err) {
        console.error("Error while creating the table:", err);
    }
};

createAnimeTable();

const getAllAnime = async () => {
    const res = await pool.query("SELECT * FROM anime");
    return res.rows;
};

const getAnimeBySlug = async (slug) => {
    const res = await pool.query("SELECT * FROM anime WHERE slug = $1", [slug]);
    return res.rows[0] || null;
};

const getOngoingAnime = async () => {
    const res = await pool.query("SELECT * FROM anime WHERE status = 'ongoing'");
    return res.rows;
};

const addAnime = async (anime) => {
    const { image_url, title, description, release_year, status, slug, genres, type } = anime;
    const res = await pool.query(
        `INSERT INTO anime (image_url, title, description, release_year, status, slug, genres, type) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [image_url, title, description, release_year, status, slug, genres, type]
    );
    return res.rows[0];
};

const rateAnime = async (slug, rating) => {
    const res = await pool.query(
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
    return res.rows[0] || null;
};

module.exports = { getAllAnime, getAnimeBySlug, getOngoingAnime, addAnime, rateAnime };