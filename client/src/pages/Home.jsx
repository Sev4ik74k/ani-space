import { useState } from "react";
import { Box, TextField, IconButton, Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AnimeCarousel from "../components/AnimeCarousel.jsx";

const Home = () => {
    const [search, setSearch] = useState("");

    return (
        <Container sx={{ minHeight: "100vh" }}>
            <Box display="flex" justifyContent="center" mt={4} mb={4}>
                <TextField
                    variant="outlined"
                    placeholder="Поиск аниме..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ width: "50%" }}
                />
                <IconButton color="primary" sx={{ ml: 1, width: '50px', height: '50px' }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            <AnimeCarousel />
        </Container>
    );
};

export default Home;