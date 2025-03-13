const express = require("express");
const { getAllAnimeHandler, getAnimeBySlugHandler, getOngoingAnimeHandler, addAnimeHandler, rateAnimeHandler } = require("../controllers/animeController");

const router = express.Router();

router.get("/ongoings", getOngoingAnimeHandler);
router.get("/", getAllAnimeHandler);
router.get("/:slug", getAnimeBySlugHandler);
router.post("/", addAnimeHandler);
router.post("/:slug/rate", rateAnimeHandler);

module.exports = router;
