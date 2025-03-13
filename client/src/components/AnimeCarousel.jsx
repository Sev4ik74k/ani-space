import { useGetOngoingAnimeQuery } from "../store/animeApi";
import Slider from "react-slick";
import { Box, Card, CardActionArea, CardMedia, IconButton, Typography, Container, CircularProgress } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <IconButton
            onClick={onClick}
            sx={{ position: "absolute", left: -30, top: "50%", transform: "translateY(-50%)", color: "gray", background: "none", "&:hover": { color: "darkgray" }}}
        >
            <ArrowBackIosNewIcon />
        </IconButton>
    );
};

const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <IconButton
            onClick={onClick}
            sx={{ position: "absolute", right: -30, top: "50%", transform: "translateY(-50%)", color: "gray", background: "none", "&:hover": { color: "darkgray" }}}
        >
            <ArrowForwardIosIcon />
        </IconButton>
    );
};

const AnimeCarousel = () => {
    const { data: ongoingAnime = [], isLoading, error } = useGetOngoingAnimeQuery();

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    return (
        <Container>
            <Box sx={{ margin: "20px auto", paddingY: 2, paddingX: 5, backgroundColor: "#f5f5f5", borderRadius: 3 }}>
                <Typography variant="h5" sx={{ textAlign: "center" }} mb={2}>
                    Онгоинги
                </Typography>

                {isLoading && <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}><CircularProgress /></Box>}
                {error && <Typography color="error" textAlign="center">Ошибка загрузки данных</Typography>}

                {!isLoading && !error && ongoingAnime.length > 0 && (
                    <Slider {...settings}>
                        {ongoingAnime.map((anime) => (
                            <Box key={anime.id} sx={{ px: 1 }}>
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
                            </Box>
                        ))}
                    </Slider>
                )}
            </Box>
        </Container>
    );
};

export default AnimeCarousel;
