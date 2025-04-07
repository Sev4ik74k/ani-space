import { Container, Typography, Card, CardContent, CircularProgress, Box } from "@mui/material";
import { useFetchReviewsQuery } from "../store/reviewApi";

const Reviews = () => {
    const { data: reviews, error, isLoading } = useFetchReviewsQuery();

    return (
        <Container maxWidth="md" sx={{ minHeight: "100vh" }}>
            <Box sx={{ margin: "20px auto", padding: 2, backgroundColor: "#f5f5f5", borderRadius: 3 }}>
                <Typography variant="h5" sx={{ textAlign: "center" }} mb={2}>
                    Отзывы
                </Typography>

                {isLoading && <CircularProgress />}
                {error && <Typography color="error">{error.data || "Ошибка загрузки отзывов"}</Typography>}

                {reviews?.map((review) => (
                    <Card key={review.id} sx={{ marginBottom: 2 }}>
                        <CardContent>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="h6">{review.anime_title}</Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {new Date(review.created_at).toLocaleDateString()}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="textSecondary">
                                {review.username} – Оценка: {review.rating}/10
                            </Typography>
                            <Typography variant="body1" sx={{ marginTop: 1 }}>
                                {review.comment}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};

export default Reviews;
