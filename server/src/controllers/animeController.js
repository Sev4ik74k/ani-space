const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getAllAnime = async (req, res) => {
    try {
        const animeList = await prisma.anime.findMany();
        res.json(animeList);
    } catch (error) {
        console.error("Error fetching anime list:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getAnimeBySlug = async (req, res) => {
    const { slug } = req.params;

    try {
        const anime = await prisma.anime.findUnique({ where: { slug } });

        if (!anime) {
            return res.status(404).json({ message: "Anime not found" });
        }

        res.json(anime);
    } catch (error) {
        console.error("Error fetching anime by slug:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getOngoingAnime = async (req, res) => {
    try {
        const ongoingAnime = await prisma.anime.findMany({ where: { status: "ongoing" } });
        res.json(ongoingAnime);
    } catch (error) {
        console.error("Error fetching ongoing anime:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.addAnime = async (req, res) => {
    const { imageUrl, title, description, releaseYear, status, slug, genres, type } = req.body;

    if (!imageUrl || !title || !description || !releaseYear || !status || !slug || !genres || !type) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newAnime = await prisma.anime.create({
            data: {
                imageUrl,
                title,
                description,
                releaseYear,
                status,
                slug,
                genres,
                type,
            },
        });

        res.status(201).json(newAnime);
    } catch (error) {
        console.error("Error adding anime:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.rateAnime = async (req, res) => {
    const { slug } = req.params;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 10) {
        return res.status(400).json({ message: "Rating must be between 1 and 10" });
    }

    try {
        const anime = await prisma.anime.findUnique({ where: { slug } });

        if (!anime) {
            return res.status(404).json({ message: "Anime not found" });
        }

        const updatedAnime = await prisma.anime.update({
            where: { slug },
            data: {
                rating: anime.rating
                    ? (anime.rating * anime.ratingCount + rating) / (anime.ratingCount + 1)
                    : rating,
                ratingCount: anime.ratingCount + 1,
            },
        });

        res.json(updatedAnime);
    } catch (error) {
        console.error("Error rating anime:", error);
        res.status(500).json({ message: "Server error" });
    }
};
