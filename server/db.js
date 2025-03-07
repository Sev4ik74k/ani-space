const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.connect()
    .then(() => console.log("Подключение к базе данных успешно"))
    .catch(err => console.error("Ошибка подключения к БД", err));

module.exports = pool;
