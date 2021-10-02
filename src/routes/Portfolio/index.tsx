import { Container, Typography, styled } from "@mui/material";
import Twemoji from "../../components/Twemoji";
import styles from "./styles";

const Div = styled("div")({});

export const Portfolio = () => {
    return (
        <Container sx={styles.root}>
            <Div sx={styles.container}>
                <Typography variant="h3" sx={styles.title}>
                    Who am I ?
                </Typography>
                <Typography variant="body1" sx={styles.paragraph}>
                    Heya ! My name is <b>Colin</b>, I'm currently living in <b>Switzerland</b> and
                    studying in High School.
                </Typography>
                <Typography variant="body1" sx={styles.paragraph}>
                    I love to program things to make other people's lives easier, such as automation
                    of easy repetitive tasks.
                </Typography>
                <Typography variant="body1" sx={styles.paragraph}>
                    When I'm not in front of my computer, I either play the <b>Piano</b>{" "}
                    <Twemoji emoji="🎹" /> or practice <b>Judo</b> <Twemoji emoji="🥋" />
                </Typography>
            </Div>
            <Div sx={styles.container}>
                <Typography variant="h3" sx={styles.title}>
                    What do I program ?
                </Typography>
                <Typography variant="body1" sx={styles.paragraph}>
                    My main programming language is without any doubts <b>Typescript</b>, I fell in
                    love with it <b>3 years ago</b>. <br />
                    I'm also OK with <b>Javascript</b>, but I just can't get rid of types
                </Typography>
                <Typography variant="body1" sx={styles.paragraph}>
                    I am fluent in writing and understanding basic programs written in C-like
                    languages such as <b>Java</b>, <b>C#</b> or <b>C++</b>
                </Typography>
            </Div>
        </Container>
    );
};
