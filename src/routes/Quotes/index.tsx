import { Container, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Quote } from "../../components/Quote/index";
import styles from "./styles";

export const Quotes = () => {
    const Span = styled("span")({});

    return (
        <Container sx={styles.root}>
            <Box sx={styles.container}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    Hall of <Span sx={styles.spellerror}>Fame</Span>
                </Typography>
                <Quote text="cstef go clutch" author="lairr" />
                <Quote text="what the f* did I just write" author="cstef" right />
                <Quote text="Je suis un plant de tomates" author="My biology teacher" />
                <Quote text="cool" author="My maths teacher" />
            </Box>
        </Container>
    );
};
