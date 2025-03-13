const pool = require("../db");

const getUserByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        const userQuery = await pool.query("SELECT id, username FROM users WHERE username = $1", [username]);

        if (userQuery.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = userQuery.rows[0];
        res.json(user);
    } catch (error) {
        console.error("Error while retrieving the user", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getUserByUsername };