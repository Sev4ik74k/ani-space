const { PrismaClient } = require("@prisma/client");
const path = require("path");

const prisma = new PrismaClient();

exports.getUserByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { username },
            select: { id: true, username: true, email: true, role: true, avatar: true },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateAvatar = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    try {
        const avatarPath = `uploads/avatars/${req.file.filename}`;

        await prisma.user.update({
            where: { id: req.user.id },
            data: { avatar: avatarPath },
        });

        res.json({ message: "Avatar updated successfully", avatar: avatarPath });
    } catch (error) {
        console.error("Error updating avatar:", error);
        res.status(500).json({ message: "Server error" });
    }
};