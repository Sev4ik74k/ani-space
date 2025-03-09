const express = require("express");
const router = express.Router();
const pool = require("../db");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

router.put("/make-admin", verifyToken, isAdmin, async (req, res) => {
    const { email } = req.body;

    console.log("запрос на выдачу админа для:", email);

    if (!email) {
        console.log("Ошибка: email не передан!");
        return res.status(400).json({ message: "Email обязателен!" });
    }

    try {
        const userRes = await pool.query("SELECT id, role FROM users WHERE email = $1", [email]);

        if (userRes.rows.length === 0) {
            console.log("Ошибка: Пользователь не найден!");
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        const user = userRes.rows[0];
        console.log("Найден пользователь:", user);

        if (user.role === "admin") {
            console.log("Этот пользователь уже админ");
            return res.status(400).json({ message: "Этот пользователь уже администратор!" });
        }

        await pool.query("UPDATE users SET role = 'admin' WHERE email = $1", [email]);

        res.json({ message: `Пользователь ${email} теперь администратор!` });

    } catch (error) {
        console.error("ошибка сервера:", error);
        res.status(500).json({ message: "Ошибка сервера", error: error.message });
    }
});

router.put("/remove-admin", verifyToken, isAdmin, async (req, res) => {
    const { email } = req.body;

    console.log("Запрос на удаление админа для email:", email);

    if (!email) {
        console.log("Ошибка: email не передан");
        return res.status(400).json({ message: "Email обязателен!" });
    }

    try {
        const userRes = await pool.query("SELECT id, role FROM users WHERE email = $1", [email]);

        if (userRes.rows.length === 0) {
            console.log("Ошибка: Пользователь не найден!");
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        const user = userRes.rows[0];

        if (user.role !== "admin") {
            console.log("Этот пользователь не является админом");
            return res.status(400).json({ message: "Этот пользователь не администратор!" });
        }

        await pool.query("UPDATE users SET role = 'user' WHERE email = $1", [email]);

        res.json({ message: `Пользователь ${email} теперь обычный пользователь!` });

    } catch (error) {
        console.error("Ошибка сервера:", error);
        res.status(500).json({ message: "Ошибка сервера", error: error.message });
    }
});


module.exports = router;
