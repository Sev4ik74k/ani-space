require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const LocalSession = require("telegraf-session-local");
const axios = require("axios");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(new LocalSession({ database: "session_db.json" }).middleware());

bot.start((ctx) => {
    ctx.reply(
        "Привет! Оставь отзыв об аниме!",
        Markup.keyboard([["Оставить отзыв"]]).resize()
    );
});

bot.hears("Оставить отзыв", (ctx) => {
    ctx.session = {};
    ctx.session.state = "waiting_for_title";
    ctx.reply("Введи название аниме:");
});

bot.on("text", async (ctx) => {
    if (!ctx.session) ctx.session = {};

    if (ctx.session.state === "waiting_for_title") {
        ctx.session.animeTitle = ctx.message.text;
        ctx.session.state = "waiting_for_rating";
        return ctx.reply("Оцени от 1 до 10:");
    }

    if (ctx.session.state === "waiting_for_rating") {
        const rating = parseInt(ctx.message.text);
        if (isNaN(rating) || rating < 1 || rating > 10) {
            return ctx.reply("Пожалуйста, введи число от 1 до 10:");
        }
        ctx.session.rating = rating;
        ctx.session.state = "waiting_for_comment";
        return ctx.reply("Введи комментарий:");
    }

    if (ctx.session.state === "waiting_for_comment") {
        ctx.session.comment = ctx.message.text;
        ctx.session.state = null;

        const reviewData = {
            username: ctx.message.from.username || "Anonim",
            animeTitle: ctx.session.animeTitle,
            rating: ctx.session.rating,
            comment: ctx.session.comment,
        };

        try {
            await axios.post("http://localhost:5000/reviews", reviewData);
            ctx.reply("Спасибо! Твой отзыв сохранен!");
        } catch (error) {
            ctx.reply("Ошибка на сервере, попробуй позже.");
        }
    }
});

bot.launch();
console.log("Бот запущен!");
