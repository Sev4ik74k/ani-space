import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Avatar, Typography, Paper, CircularProgress, Container, Button, Stack } from "@mui/material";
import { fetchUserByUsername } from "../store/userSlice";
import avatarPlaceholder from "../assets/default-avatar.png";
import AnimeList from "../components/AnimeList";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const Profile = () => {
    const { username } = useParams();
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.user);
    const authUser = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUserByUsername(username));
    }, [dispatch, username]);

    if (loading) {
        return (
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography variant="h6" color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Container sx={{ minHeight: "100vh" }}>
            <Paper elevation={3} sx={{ maxWidth: '100%', margin: "20px auto", padding: 3, textAlign: "center" }}>
                <Avatar
                    src={user?.avatar || avatarPlaceholder}
                    alt={user?.username}
                    sx={{ width: 100, height: 100, margin: "0 auto" }}
                />
                <Typography variant="h6" sx={{ mt: 2 }}>{user?.username}</Typography>

                {authUser?.username === username && (
                    <Stack direction="column" spacing={2} alignItems="center" sx={{ mt: 2 }}>
                        <Button color="inherit" sx={{ display: "flex", alignItems: "center" }}>
                            Изменить профиль
                            <SettingsIcon sx={{ marginLeft: 1 }} />
                        </Button>
                    </Stack>
                )}

                {authUser?.username === username && authUser?.role === "admin" && (
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: 220, mt: 2 }}
                        onClick={() => navigate("/admin")}
                    >
                        Панель админа
                        <AdminPanelSettingsIcon sx={{ marginLeft: 1 }} />
                    </Button>
                )}
            </Paper>

            <Box sx={{ mt: 4 }}>
                <AnimeList />
            </Box>
        </Container>
    );
};

export default Profile;