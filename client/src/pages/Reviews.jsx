import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../store/reviewSlice";
import {Container, Typography, Card, CardContent, CircularProgress, Box} from "@mui/material";

const Reviews = () => {
    const dispatch = useDispatch();
    const { reviews, loading, error } = useSelector((state) => state.reviews);

    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch]);

    return (
        <Container maxWidth="md" sx={{ minHeight: "100vh" }}>
            <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
                Отзывы пользователей
            </Typography>

            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}

            {reviews.map((review) => (
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
        </Container>
    );
};

export default Reviews;
