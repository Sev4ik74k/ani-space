import { useState } from "react";
import { Box, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton } from "@mui/material";
import { Visibility, Favorite, Bookmark, Delete, Star, Settings } from "@mui/icons-material";

const categories = {
    watching: { label: "Смотрю", icon: <Visibility fontSize="small" />, color: "error" },
    planned: { label: "В планах", icon: <Bookmark fontSize="small" />, color: "secondary" },
    completed: { label: "Просмотрено", icon: <Star fontSize="small" />, color: "success" },
    dropped: { label: "Брошено", icon: <Delete fontSize="small" />, color: "warning" },
    favorite: { label: "Любимое", icon: <Favorite fontSize="small" />, color: "error" },
};

const fakeAnimeData = {
    watching: [
        { id: 1, title: "Атака Титанов", score: 9.2, image: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg" },
        { id: 2, title: "Ван-Пис", score: 9.0, image: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg" },
    ],
    planned: [
        { id: 3, title: "Наруто", score: 8.5, image: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg" },
    ],
    completed: [
        { id: 4, title: "Тетрадь Смерти", score: 9.1, image: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg" },
    ],
    dropped: [
        { id: 5, title: "Фейри Тейл", score: 8.5,image: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg" },
    ],
    favorite: [
        { id: 6, title: "Код Гиасс", score: 9.3, image: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg" },
    ],
};

const AnimeList = () => {
    const [selectedCategory, setSelectedCategory] = useState("watching");

    return (
        <Box sx={{ maxWidth: 800, margin: "20px auto", padding: 2, backgroundColor: "#f5f5f5", borderRadius: 3 }}>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "start", mb: 2, flexWrap: "wrap" }}>
                {Object.entries(categories).map(([key, { label, icon, color }]) => (
                    <Button
                        key={key}
                        variant={selectedCategory === key ? "contained" : "outlined"}
                        color={color}
                        startIcon={icon}
                        onClick={() => setSelectedCategory(key)}
                        sx={{
                            textTransform: "none",
                            fontSize: "12px",
                            padding: "4px 10px",
                            minWidth: "auto",
                            borderRadius: "8px",
                        }}
                    >
                        {label}
                    </Button>
                ))}
            </Box>

            <List sx={{ backgroundColor: "#fff", borderRadius: 2, padding: 2 }}>
                {fakeAnimeData[selectedCategory]?.map((anime) => (
                    <ListItem key={anime.id} sx={{ borderBottom: "1px solid #ddd", paddingY: 1 }}>
                        <ListItemAvatar>
                            <Avatar variant="rounded" src={anime.image} alt={anime.title} />
                        </ListItemAvatar>
                        <ListItemText primary={anime.title} secondary={`Оценка: ${anime.score}`} />
                        <IconButton>
                            <Settings />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default AnimeList;
