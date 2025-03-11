const express = require("express");
const { getAllAnime, getAnimeBySlug, getOngoingAnime, addAnime, rateAnime } = require("../controllers/animeController");

const router = express.Router();

router.get("/ongoings", getOngoingAnime);
router.get("/", getAllAnime);
router.get("/:slug", getAnimeBySlug);
router.post("/", addAnime);
router.post("/:slug/rate", rateAnime);

module.exports = router;
