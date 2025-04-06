const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.makeAdmin = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === "admin") {
            return res.status(400).json({ message: "User is already an admin" });
        }

        await prisma.user.update({
            where: { email },
            data: { role: "admin" },
        });

        res.json({ message: `User ${email} is now an admin` });
    } catch (error) {
        console.error("Error making user admin:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.removeAdmin = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(400).json({ message: "User is not an admin" });
        }

        await prisma.user.update({
            where: { email },
            data: { role: "user" },
        });

        res.json({ message: `User ${email} is now a regular user` });
    } catch (error) {
        console.error("Error removing admin role:", error);
        res.status(500).json({ message: "Server error" });
    }
};
