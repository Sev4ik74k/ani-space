const pool = require("../db");

const createUserTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(10) DEFAULT 'user'
    )
  `;

    try {
        await pool.query(query);
        console.log("Таблица users создана");
    } catch (err) {
        console.error("Ошибка при создании таблицы", err);
    }
};

createUserTable();

module.exports = {
    async findUserByEmail(email) {
        const res = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        return res.rows[0];
    },

    async createUser(username, email, hashedPassword) {
        const res = await pool.query(
            "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
            [username, email, hashedPassword, "user"]
        );
        return res.rows[0];
    },
};
