const pool = require("../db");

const makeAdmin = async (req, res) => {
    const { email } = req.body;

    console.log("Request for admin privileges:", email);

    if (!email) {
        console.log("Error: Email not provided");
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const userRes = await pool.query("SELECT id, role FROM users WHERE email = $1", [email]);

        if (userRes.rows.length === 0) {
            console.log("Error: User not found");
            return res.status(404).json({ message: "User not found" });
        }

        const user = userRes.rows[0];

        if (user.role === "admin") {
            console.log("This user is already an admin");
            return res.status(400).json({ message: "This user is already an admin" });
        }

        await pool.query("UPDATE users SET role = 'admin' WHERE email = $1", [email]);

        res.json({ message: `The user ${email} is now an admin` });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const removeAdmin = async (req, res) => {
    const { email } = req.body;

    console.log("Request to remove admin privileges for email:", email);

    if (!email) {
        console.log("Error: Email not provided");
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const userRes = await pool.query("SELECT id, role FROM users WHERE email = $1", [email]);

        if (userRes.rows.length === 0) {
            console.log("Error: User not found");
            return res.status(404).json({ message: "User not found" });
        }

        const user = userRes.rows[0];

        if (user.role !== "admin") {
            console.log("That user is not an admin");
            return res.status(400).json({ message: "That user is not an admin" });
        }

        await pool.query("UPDATE users SET role = 'user' WHERE email = $1", [email]);

        res.json({ message: `The user ${email} is now a regular user.` });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { makeAdmin, removeAdmin };
