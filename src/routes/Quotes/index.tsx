import { Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Quote } from "../../components/Quote/index";
import styles from "./styles";

export const Quotes = () => {
    const Span = styled("span")({});

    return (
        <Container sx={styles.root}>
            <Typography variant="h3" sx={{ mb: 3 }}>
                Hall of <Span sx={styles.spellerror}>Fame</Span>
            </Typography>
            <Quote text="cstef go clutch" author="lairr" />
            <Quote text="what the f* did I just write" author="cstef" />
            <Quote text="cheese" author="Everyone should say that" />
            <Quote text="cheese" author="Everyone should say that" />
            <Quote text="cheese" author="Everyone should say that" />
        </Container>
    );
};
