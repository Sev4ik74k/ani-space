import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Avatar, Typography, Paper, Container, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import avatarPlaceholder from "../assets/default-avatar.png";

const AdminPanel = () => {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const [openAdd, setOpenAdd] = useState(false);
    const [openRemove, setOpenRemove] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleOpenAdd = () => {
        setOpenAdd(true);
        setError("");
        setSuccessMessage("");
    };

    const handleOpenRemove = () => {
        setOpenRemove(true);
        setError("");
        setSuccessMessage("");
    };

    const handleClose = () => {
        setOpenAdd(false);
        setOpenRemove(false);
        setEmail("");
    };

    const handleMakeAdmin = async () => {
        if (!email) {
            setError("Введите email пользователя!");
            return;
        }

        try {
            const response = await axios.put(
                "http://localhost:5000/admin/make-admin",
                { email },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log("Успешный ответ сервера:", response.data);
            setSuccessMessage(response.data.message);
            setEmail("");
        } catch (error) {
            console.error("Ошибка запроса:", error.response?.data);
            setError(error.response?.data?.message || "Ошибка при назначении админа");
        }
    };

    const handleRemoveAdmin = async () => {
        if (!email) {
            setError("Введите email пользователя!");
            return;
        }

        try {
            const response = await axios.put(
                "http://localhost:5000/admin/remove-admin",
                { email },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log("Успешный ответ сервера:", response.data);
            setSuccessMessage(response.data.message);
            setEmail("");
        } catch (error) {
            console.error("Ошибка запроса:", error.response?.data);
            setError(error.response?.data?.message || "Ошибка при удалении админа");
        }
    };

    return (
        <Container
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                py: 4,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    width: '100%',
                    padding: 4,
                    textAlign: "center",
                    borderRadius: 4,
                    backgroundColor: "#ffffff",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Avatar
                    src={user?.avatar || avatarPlaceholder}
                    alt={user?.username}
                    sx={{
                        width: 120,
                        height: 120,
                        margin: "0 auto",
                        border: "4px solid #3f51b5",
                    }}
                />

                <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
                    {user?.username || "Администратор"}
                </Typography>

                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#3f51b5", mt: 1 }}>
                    Админ
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mt: 3 }}>
                    <Button variant="contained" color="primary" sx={{ width: "250px" }} onClick={handleOpenAdd}>
                        Добавить админа
                    </Button>
                    <Button variant="contained" color="error" sx={{ width: "250px" }} onClick={handleOpenRemove}>
                        Удалить админа
                    </Button>
                </Box>
            </Paper>

            <Modal open={openAdd} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Назначить нового администратора
                    </Typography>

                    <TextField
                        fullWidth
                        label="Email пользователя"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mt: 2 }}
                    />

                    {error && <Typography variant="body2" color="error" sx={{ mt: 2 }}>{error}</Typography>}
                    {successMessage && <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>{successMessage}</Typography>}

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                        <Button onClick={handleClose} sx={{ mr: 2 }}>
                            Отмена
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleMakeAdmin}>
                            Назначить
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Modal open={openRemove} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Удалить администратора
                    </Typography>

                    <TextField
                        fullWidth
                        label="Email администратора"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mt: 2 }}
                    />

                    {error && <Typography variant="body2" color="error" sx={{ mt: 2 }}>{error}</Typography>}
                    {successMessage && <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>{successMessage}</Typography>}

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                        <Button onClick={handleClose} sx={{ mr: 2 }}>
                            Отмена
                        </Button>
                        <Button variant="contained" color="error" onClick={handleRemoveAdmin}>
                            Удалить
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default AdminPanel;
