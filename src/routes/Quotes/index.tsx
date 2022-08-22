import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Quote } from "../../components/Quote/index";
import styles from "./styles";
import SpellError from "../../components/SpellError/index";

const QUOTES: { text: string; author: string }[] = [
    { text: "cstef go clutch", author: "lairr" },
    { text: "what the f* did I just write", author: "cstef" },
    { text: "Je suis un plant de tomates", author: "My biology teacher" },
    { text: "cool", author: "My maths teacher" },
    { text: "Oh tu fais trop le mec", author: "Someone" },
    { text: "Thanks for your opinion", author: "Doge" },
    { text:"La calvitie c'est dur mais la Turquie c'est sur...", author: "guuN" }
];

export const Quotes = () => {
    return (
        <Container sx={styles.root}>
            <Box sx={styles.container}>
                <Typography variant="h4" sx={{ mb: 3, color: "text.primary" }}>
                    Hall of <SpellError>Fame</SpellError>
                </Typography>
                {QUOTES.map((e, i) => (
                    <Quote {...e} right={Boolean(i % 2)} key={i} />
                ))}
            </Box>
        </Container>
    );
};
