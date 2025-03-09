const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const UserModel = require("../models/user");

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Заполните все поля" });
    }

    try {
        const existingUser = await UserModel.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Пользователь уже существует" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.createUser(username, email, hashedPassword);

        const token = jwt.sign({ id: newUser.id, username: newUser.username, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ token, user: { id: newUser.id, username: newUser.username, role: newUser.role } });
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Заполните все поля" });
    }

    try {
        const user = await UserModel.findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Пользователь не найден" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Неверный пароль" });
        }

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
};
