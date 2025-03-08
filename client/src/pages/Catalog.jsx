import { useState } from "react";
import {
    Card,
    CardActionArea,
    CardMedia,
    Typography,
    IconButton,
    Tooltip,
    Grid,
    Pagination,
    Box,
    Container,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const animeList = Array.from({ length: 60 }, (_, index) => ({
    id: index + 1,
    title: `Аниме ${index + 1}`,
    image: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
    description: `Описание аниме ${index + 1}`,
}));

const ITEMS_PER_PAGE = 30;


const Catalog = () => {
    const [page, setPage] = useState(1);

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const selectedAnime = animeList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" sx={{ marginTop: 4, marginBottom: 2 }}>
                Каталог аниме
            </Typography>

            <Grid container spacing={2} justifyContent="center">
                {selectedAnime.map((anime) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={anime.id}>
                        <Card sx={{ width: 170, height: 250, position: "relative", mx: "auto", borderRadius: 2, overflow: "hidden" }}>
                            <CardActionArea sx={{ position: "relative", height: "100%" }}>
                                <CardMedia
                                    component="img"
                                    image={anime.image}
                                    alt={anime.title}
                                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />

                                <Tooltip title={anime.description} arrow>
                                    <IconButton
                                        sx={{
                                            position: "absolute",
                                            top: 5,
                                            left: 5,
                                            color: "rgba(0,0,0,0.6)",
                                        }}
                                    >
                                        <InfoIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>

                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: 0,
                                        width: "100%",
                                        background: "rgba(0, 0, 0, 0.6)",
                                        color: "#fff",
                                        textAlign: "center",
                                        padding: "3px 0",
                                        lineHeight: 1,
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: "0.9rem",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                            display: "block",
                                        }}
                                    >
                                        {anime.title}
                                    </Typography>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 4 }}>
                <Pagination
                    count={Math.ceil(animeList.length / ITEMS_PER_PAGE)}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    shape="rounded"
                />
            </Box>
        </Container>
    );
};

export default Catalog;