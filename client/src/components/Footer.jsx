import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                background: 'linear-gradient(90deg, #2575FC 0%, #6A11CB 100%)',
                color: 'white',
                py: 4,
            }}
        >
            <Container>
                <Box textAlign="center">
                    <Typography variant="body2">
                        © {new Date().getFullYear()} AniSpace. Все права защищены.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
