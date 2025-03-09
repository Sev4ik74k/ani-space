import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container, Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice.js";
import AuthModal from "./AuthModal";
import logo from "../assets/logo.png";
import avatar from "../assets/default-avatar.png";
import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import ListIcon from '@mui/icons-material/List';
import PeopleIcon from '@mui/icons-material/People';

const fontStyles = {
    fontFamily: "Open Sans, sans-serif",
};

const buttonStyles = {
    ...fontStyles,
    textTransform: "none",
    fontSize: "16px",
};

const Header = () => {
    const { user } = useSelector((state) => state.auth);
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
                            <Button color="inherit"
                                    component={Link}
                                    to="/catalog"
                                    sx={buttonStyles}>
                                <ListIcon fontSize="small" sx={{ marginRight: 1 }} />
                                Каталог
                            </Button>
                            <Button color="inherit"
                                    component={Link}
                                    to="/community"
                                    sx={buttonStyles}>
                                <PeopleIcon fontSize="small" sx={{ marginRight: 1 }} />
                                Комьюнити
                            </Button>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            {user ? (
                                <>
                                    <Link to={`/profile/${user.username}`} style={{ display: "flex", alignItems: "center", color: "inherit" }}>
                                        <Avatar src={avatar} alt="User Avatar" sx={{ width: 50, height: 50, marginRight: 1 }} />
                                        <Typography sx={fontStyles}>{user.username}</Typography>
                                    </Link>
                                    <Button
                                        color="inherit"
                                        onClick={() => dispatch(logout())}
                                        sx={buttonStyles}
                                    >
                                        Выйти
                                        <LogoutIcon fontSize="small" sx={{ marginLeft: 1 }} />
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