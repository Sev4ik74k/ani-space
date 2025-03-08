import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../store/reviewSlice";
import { Container, Typography, Card, CardContent, CircularProgress } from "@mui/material";

const Reviews = () => {
    const dispatch = useDispatch();
    const { reviews, loading, error } = useSelector((state) => state.reviews);

    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch]);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{ marginTop: 4, marginBottom: 2 }}>
                Отзывы пользователей
            </Typography>

            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}

            {reviews.map((review) => (
                <Card key={review.id} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{review.anime_title}</Typography>
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
