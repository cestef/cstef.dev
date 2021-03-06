import { GitHub, Instagram, Twitter } from "@mui/icons-material";
import { Container, SvgIcon, Typography, useTheme } from "@mui/material";
import { Box, styled } from "@mui/system";
import { motion } from "framer-motion";
import SH from "react-syntax-highlighter";
import { atomOneDark, atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SpellError from "../../components/SpellError";
import styles from "./styles";
import ButtonLink from "../../components/ButtonLink/index";

export const Home = () => {
    const code = `class Cstef {
    name: string;
    age: number;
    skills: string[];
    constructor() {
        this.name = "Colin";
        this.age = 16;
        this.skills = [
            "typescript",
            "react",
            "csharp"
        ];
    }
}`;
    const SyntaxHighlighter = styled(SH)({});
    const theme = useTheme();
    return (
        <Container sx={styles.root}>
            <motion.div whileHover={{ y: -10 }}>
                <SyntaxHighlighter
                    language="typescript"
                    style={theme.palette.mode === "dark" ? atomOneDark : atomOneLight}
                    sx={styles.codeBlock}
                >
                    {code}
                </SyntaxHighlighter>
            </motion.div>

            <Box sx={styles.content}>
                <motion.div animate={{ scale: [0.2, 1] }} transition={{ duration: 0.5 }}>
                    <Typography variant="h1" sx={{ color: "text.primary" }}>
                        Hello, World{"\u00A0"}!
                    </Typography>
                </motion.div>
                <Typography variant="h4" sx={styles.subtitle}>
                    I'm a <SpellError>developer</SpellError> I guess{"\u00A0"}?
                </Typography>
                <Typography variant="h5" sx={styles.paragraph}>
                    I develop <SpellError>fun</SpellError> things during my freetime.
                    <br />
                </Typography>
                <Box sx={styles.buttons}>
                    <ButtonLink href="https://github.com/cestef/">
                        <GitHub fontSize="large" />
                    </ButtonLink>
                    <ButtonLink href="https://twitter.com/AkaCstef">
                        <Twitter fontSize="large" />
                    </ButtonLink>
                    <ButtonLink href="https://www.instagram.com/cstef._">
                        <Instagram fontSize="large" />
                    </ButtonLink>
                    <ButtonLink href="https://discord.com/users/699912716474777631">
                        <SvgIcon viewBox="0 0 71 55" fontSize="large">
                            <path
                                d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                                fill={
                                    theme.palette.mode === "dark" ? "#fff" : "rgba(0, 0, 0, 0.54)"
                                }
                            />
                        </SvgIcon>
                    </ButtonLink>
                    <ButtonLink href="https://steamcommunity.com/id/667ekip667">
                        <SvgIcon viewBox="0 0 333333 333333" fontSize="large">
                            <path
                                d="M225 162617l73189 29853c9154-5256 19765-8262 31078-8262 1987 0 3951 94 5890 275l52891-75293v-53c0-23479 9518-44736 24906-60124s36645-24906 60124-24906 44736 9518 60124 24906 24906 36646 24906 60124c0 23479-9518 44736-24906 60124s-36645 24906-60124 24906c-299 0-597-3-895-6l-80753 59150c-1534 14627-8112 27754-17964 37606-11312 11312-26939 18309-44200 18309s-32887-6997-44200-18309c-8257-8257-14215-18813-16831-30626L-1 242906l225-80289zm95341 38889l19367 7899c40021 16324 22200 80460-26977 68683l-24105-9642c2148 4009 4870 7663 8059 10852 8337 8337 19857 13494 32581 13494s24244-5157 32581-13494 13494-19857 13494-32581-5157-24244-13494-32581-19856-13494-32581-13494c-3054 0-6038 298-8925 865zM247997 66956c23541 0 42624 19084 42624 42624 0 23541-19084 42624-42624 42624-23541 0-42624-19083-42624-42624s19083-42624 42624-42624zm39709 2778c-10083-10083-24015-16320-39404-16320s-29320 6237-39404 16320c-10083 10083-16320 24015-16320 39404s6237 29320 16320 39404c10083 10083 24015 16320 39404 16320s29321-6237 39404-16320 16320-24015 16320-39404-6237-29321-16320-39404z"
                                fill={
                                    theme.palette.mode === "dark" ? "#fff" : "rgba(0, 0, 0, 0.54)"
                                }
                            />
                        </SvgIcon>
                    </ButtonLink>
                </Box>
            </Box>
        </Container>
    );
};
