import { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { registerUser, loginUser } from "../store/authSlice.js";

const fontStyles = {
    fontFamily: "Open Sans, sans-serif",
};

const buttonStyles = {
    ...fontStyles,
    textTransform: "none",
    fontSize: "16px",
};

const AuthModal = ({ open, onClose, authType }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (authType === "register") {
            dispatch(registerUser(formData));
        } else {
            dispatch(loginUser({ email: formData.email, password: formData.password }));
        }
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: 400,
                    margin: "100px auto",
                    padding: 4,
                    bgcolor: "white",
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h6" mb={2} sx={fontStyles}>
                    {authType === "register" ? "Регистрация" : "Вход"}
                </Typography>
                <form onSubmit={handleSubmit}>
                    {authType === "register" && (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Имя пользователя"
                            name="username"
                            onChange={handleChange}
                        />
                    )}
                    <TextField fullWidth margin="normal" label="Email" name="email" onChange={handleChange} />
                    <TextField fullWidth margin="normal" label="Пароль" type="password" name="password" onChange={handleChange} />
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{
                            background: "linear-gradient(90deg, #6A11CB 0%, #2575FC 100%)",
                            color: "white",
                            marginTop: 2,
                            ...buttonStyles,
                            "&:hover": {
                                background: "linear-gradient(90deg, #5a0faa 0%, #1f6cfb 100%)",
                            }
                        }}
                    >
                        {authType === "register" ? "Зарегистрироваться" : "Войти"}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default AuthModal;
