import { Container, Typography } from "@mui/material";
export const NotFound = () => {
    return (
        <Container>
            <Typography sx={{ fontSize: 250 }} color="text.primary" align="center">
                404
            </Typography>
            <Typography variant="h2" color="text.primary" align="center">
                Dang Sorry I did all I could but I didn't find anything...
            </Typography>
        </Container>
    );
};
