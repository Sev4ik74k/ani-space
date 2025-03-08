import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import AuthModal from "./AuthModal";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const fontStyles = {
    fontFamily: "Open Sans, sans-serif",
};

const buttonStyles = {
    ...fontStyles,
    textTransform: "none",
    fontSize: "16px",
};

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
                            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                                <img src={logo} alt="AniSpace" style={{ height: 70, marginRight: 10 }} />
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FFF", ...fontStyles, letterSpacing: "1px"  }}>
                                    AniSpace
                                </Typography>
                            </Link>
                        </Box>

                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button color="inherit" component={Link} to="/catalog" sx={buttonStyles}>Каталог</Button>
                            <Button color="inherit" component={Link} to="/community" sx={buttonStyles}>Комьюнити</Button>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            {user ? (
                                <>
                                    <Button color="inherit" component={Link} to="/profile" sx={buttonStyles}>
                                        {user.username}
                                    </Button>
                                    <Button color="inherit" onClick={() => dispatch(logout())} sx={buttonStyles}>
                                        Выйти
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button color="inherit" onClick={() => { setAuthType("login"); setOpenModal(true); }} sx={buttonStyles}>
                                        Вход
                                    </Button>
                                    <Button color="inherit" onClick={() => { setAuthType("register"); setOpenModal(true); }} sx={buttonStyles}>
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