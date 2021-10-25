import styles from "./styles";
import { Container, Typography } from "@mui/material";
import Email from "../../components/Email";
export const Contact = () => {
    return (
        <Container sx={styles.root}>
            <Typography variant="h3" color="text.primary">
                Contact me !
            </Typography>
            <Typography variant="h6" color="text.secondary">
                Want my email ? Let's play a game ;)
            </Typography>
            <Email />
        </Container>
    );
};
