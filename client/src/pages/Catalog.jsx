import { useState } from "react";
import {
    Card,
    CardActionArea,
    CardMedia,
    Typography,
    Grid,
    Pagination,
    Box,
    Container,
    CircularProgress,
} from "@mui/material";
import { useGetAnimeListQuery } from "../store/animeApi";

const ITEMS_PER_PAGE = 30;

const Catalog = () => {
    const [page, setPage] = useState(1);

    const { data: animeList = [], isLoading, error } = useGetAnimeListQuery();

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const selectedAnime = animeList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <Container sx={{ minHeight: "100vh" }}>
            <Box sx={{ margin: "20px auto", padding: 2, backgroundColor: "#f5f5f5", borderRadius: 3 }}>
                <Typography variant="h5" sx={{ textAlign: "center" }} mb={2}>
                    Каталог аниме
                </Typography>

                {isLoading && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <CircularProgress />
                    </Box>
                )}

                {error && (
                    <Typography color="error" textAlign="center">
                        Ошибка загрузки аниме
                    </Typography>
                )}

                {!isLoading && !error && (
                    <>
                        <Grid container spacing={2} justifyContent="start">
                            {selectedAnime.map((anime) => (
                                <Grid item xs={6} sm={4} md={3} lg={2} key={anime.id}>
                                    <Card sx={{ width: 170, height: 250, position: "relative", mx: "auto", borderRadius: 2, overflow: "hidden" }}>
                                        <CardActionArea component={'div'} sx={{ position: "relative", height: "100%" }}>
                                            <CardMedia
                                                component="img"
                                                image={anime.image_url}
                                                alt={anime.title}
                                                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            />

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
                    </>
                )}
            </Box>
        </Container>
    );
};

export default Catalog;
