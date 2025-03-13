const { getAllAnime, getAnimeBySlug, addAnime, rateAnime } = require("../models/anime");

const getAllAnimeHandler = async (req, res) => {
    try {
        const animeList = await getAllAnime();
        res.json(animeList);
    } catch (error) {
        console.error("Error while retrieving the anime list:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getAnimeBySlugHandler = async (req, res) => {
    const { slug } = req.params;
    try {
        const anime = await getAnimeBySlug(slug);
        if (!anime) {
            return res.status(404).json({ message: "Anime not found" });
        }
        res.json(anime);
    } catch (error) {
        console.error("Error while retrieving anime:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getOngoingAnimeHandler = async (req, res) => {
    try {
        const ongoingAnime = await getAllAnime();
        const filteredAnime = ongoingAnime.filter(anime => anime.status === 'ongoing');
        res.json(filteredAnime);
    } catch (error) {
        console.error("Error while retrieving ongoings:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const addAnimeHandler = async (req, res) => {
    try {
        const newAnime = await addAnime(req.body);
        res.status(201).json(newAnime);
    } catch (error) {
        console.error("Error while adding anime:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const rateAnimeHandler = async (req, res) => {
    const { slug } = req.params;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 10) {
        return res.status(400).json({ message: "Rating must be between 1 and 10" });
    }

    try {
        const updatedAnime = await rateAnime(slug, rating);
        if (!updatedAnime) {
            return res.status(404).json({ message: "Anime not found" });
        }
        res.json(updatedAnime);
    } catch (error) {
        console.error("Error while rating anime:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getAllAnimeHandler, getAnimeBySlugHandler, getOngoingAnimeHandler, addAnimeHandler, rateAnimeHandler };