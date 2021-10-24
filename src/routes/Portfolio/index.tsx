import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
} from "@mui/lab";
import { Container, Typography, styled, Paper } from "@mui/material";
import { motion } from "framer-motion";
import Twemoji from "../../components/Twemoji";
import styles from "./styles";
import ImageEmoji from "../../components/ImageEmoji/index";

const Events: { title: string; description: string; time: string }[] = [
    {
        title: "Beginnings",
        description:
            "I was very creative as a child, I loved building Legos and thus I began imaginating systems (that never worked) and fantasizing at big constructions when shopping",
        time: "2011",
    },
    {
        title: "Messing around",
        description:
            "Where it all began. My father showed me a block-programming platform named Scratch (scratch.mit.edu)",
        time: "2013",
    },
    {
        title: "Getting serious",
        description: "I programmed for the first time useful things in real life with mBlock",
        time: "2014",
    },
    {
        title: 'First steps into the "Real World"',
        description:
            "During a trip to Italy, with the idea of ​​a Discord bot, a raspberry PI and the TV in the hotel room, I started to create my first program in JavaScript",
        time: "2018",
    },
    {
        title: "Types, Types everywhere !",
        description:
            "After creating Discord bots over and over again, I discovered TypeScript: JavaScript with syntax for types.",
        time: "2018",
    },
    {
        title: "Mine BOT",
        description:
            "My first serious project. I spent too much time on this, but this allowed me to discover what having a community is like and the duty to maintain a project.",
        time: "2019",
    },
    {
        title: "My first job",
        description:
            "I was able to find an internship despite COVID at a local IT company. I worked there as a field technician, even though it was pretty exhausting and a bit boring sometimes, I had a lot of fun and learned lot of things.",
        time: "2020",
    },
    {
        title: "First job as a web-dev !",
        description:
            "I managed to find another internship, this time at Swisscom, one of the biggest IT company in Switzerland. I helped developing a Full-Stack app using React, the team there was amazing and we got along pretty well !",
        time: "2021",
    },
    {
        title: "And now what ?",
        description:
            "I am currently studying at highschool, waiting for the days to finish and get back home programming. I'm planning to continue my studies in the IT branch but I'm not sure which one yet (:",
        time: "Today",
    },
];

export const Portfolio = () => {
    const Div = styled(motion.div)({});
    return (
        <Container sx={styles.root}>
            <Typography variant="h2" alignSelf="center">
                My Portfolio
            </Typography>
            <Div
                animate={{ x: [-1000, 0] }}
                transition={{ duration: 0.8, x: { type: "spring", stiffness: 50 } }}
                sx={{ alignSelf: "flex-start" }}
            >
                <Paper elevation={4} sx={styles.container}>
                    <Typography variant="h3" sx={styles.title}>
                        Who am I ?
                    </Typography>
                    <Typography variant="body1" sx={styles.paragraph}>
                        Heya ! My name is <b>Colin</b>, I'm currently living in <b>Switzerland</b>
                        {"\u00A0"}
                        <Twemoji emoji="🇨🇭" /> and studying in High School.
                    </Typography>
                    <Typography variant="body1" sx={styles.paragraph}>
                        I love to program things to make other people's lives easier, such as
                        automation of easy repetitive tasks.
                    </Typography>
                    <Typography variant="body1" sx={styles.paragraph}>
                        When I'm not in front of my computer, I either play the <b>Piano</b>{" "}
                        <Twemoji emoji="🎹" /> or practice <b>Judo</b> <Twemoji emoji="🥋" />
                    </Typography>
                </Paper>
            </Div>
            <Div
                animate={{ x: [1000, 0] }}
                transition={{
                    duration: 0.8,
                    type: "spring",
                    stiffness: 50,
                    delay: 0.2,
                }}
                sx={{ alignSelf: "flex-end", mb: 10 }}
            >
                <Paper sx={styles.container} elevation={4}>
                    <Typography variant="h3" sx={styles.title}>
                        What do I program ?
                    </Typography>
                    <Typography variant="body1" sx={styles.paragraph}>
                        My main programming language is without any doubts <b>Typescript</b>
                        {"\u00A0"}
                        <ImageEmoji src={"/images/ts-512.png"} alt="Typescript Icon" />, I fell in
                        love with it <b>3 years ago</b>. <br />
                        I'm also OK with <b>Javascript</b>
                        {"\u00A0"}
                        <ImageEmoji src={"/images/js-256.png"} alt="Javascript Icon" />, but I just
                        can't get rid of types
                    </Typography>
                    <Typography variant="body1" sx={styles.paragraph}>
                        I am fluent in writing and understanding basic programs written in C-like
                        languages such as <b>Java</b>
                        {"\u00A0"}
                        <ImageEmoji src={"/images/java-650.png"} alt="Java Icon" />, <b>C#</b>
                        {"\u00A0"}
                        <ImageEmoji src={"/images/csharp-300.png"} alt="C# Icon" /> or <b>C++</b>
                        {"\u00A0"}
                        <ImageEmoji src={"/images/cpp-1200.png"} alt="C++ Icon" />
                    </Typography>
                </Paper>
            </Div>
            <Typography variant="h3" alignSelf="center" mb={5}>
                My Journey
            </Typography>
            <Timeline position="alternate" sx={{ mb: 10 }}>
                {Events.map((e, i) => (
                    <TimelineItem key={i}>
                        <TimelineOppositeContent
                            sx={{ m: "auto 0" }}
                            variant="body2"
                            color="text.secondary"
                        >
                            {e.time}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: "12px", px: 2 }}>
                            <Typography variant="h5" component="span">
                                {e.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {e.description}
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </Container>
    );
};
