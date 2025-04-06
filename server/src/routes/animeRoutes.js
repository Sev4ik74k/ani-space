const express = require("express");
const {
    getAllAnime,
    getAnimeBySlug,
    getOngoingAnime,
    addAnime,
    rateAnime,
} = require("../controllers/animeController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllAnime);
router.get("/ongoings", getOngoingAnime);
router.get("/:slug", getAnimeBySlug);
router.post("/", verifyToken, addAnime);
router.post("/:slug/rate", verifyToken, rateAnime);

module.exports = router;
