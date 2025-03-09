const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/:username", async (req, res) => {
    const { username } = req.params;

    try {
        const userQuery = await pool.query("SELECT id, username FROM users WHERE username = $1", [username]);

        if (userQuery.rows.length === 0) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        const user = userQuery.rows[0];
        res.json(user);
    } catch (error) {
        console.error("Ошибка при получении пользователя:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

module.exports = router;
