import { Container, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Quote } from "../../components/Quote/index";
import styles from "./styles";

const QUOTES = [
    { text: "cstef go clutch", author: "lairr" },
    { text: "what the f* did I just write", author: "cstef" },
    { text: "Je suis un plant de tomates", author: "My biology teacher" },
    { text: "cool", author: "My maths teacher" },
];

export const Quotes = () => {
    const Span = styled("span")({});

    return (
        <Container sx={styles.root}>
            <Box sx={styles.container}>
                <Typography variant="h4" sx={{ mb: 3, color: "text.primary" }}>
                    Hall of <Span sx={styles.spellerror}>Fame</Span>
                </Typography>
                {QUOTES.map((e, i) => (
                    <Quote {...e} right={Boolean(i % 2)} key={i} />
                ))}
            </Box>
        </Container>
    );
};
