import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import AuthModal from "./AuthModal";
import logo from "../assets/logo.png";

const Header = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [authType, setAuthType] = useState("login");

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    background: "linear-gradient(90deg, #6A11CB 0%, #2575FC 100%)",
                    padding: "10px 0",
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <img src={logo} alt="AniSpace" style={{ height: 40, marginRight: 10 }} />
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FFF" }}>
                                AniSpace
                            </Typography>
                        </Box>

                        <Box>
                            {user ? (
                                <>
                                    <Typography sx={{ marginRight: 2, color: "#FFF", display: "inline-block" }}>
                                        {user.username}
                                    </Typography>
                                    <Button color="inherit" onClick={() => dispatch(logout())}>
                                        Выйти
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button color="inherit" onClick={() => { setAuthType("login"); setOpenModal(true); }}>
                                        Вход
                                    </Button>
                                    <Button color="inherit" onClick={() => { setAuthType("register"); setOpenModal(true); }}>
                                        Регистрация
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <AuthModal open={openModal} onClose={() => setOpenModal(false)} authType={authType} />
        </>
    );
};

export default Header;
