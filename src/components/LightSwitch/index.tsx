import { motion } from "framer-motion";
import { styled } from "@mui/system";
import styles from "./styles";
import { useTheme } from "@mui/material";
import { Lightbulb } from "@mui/icons-material";

const Div = styled(motion.div)({});

const LightSwitch = ({ setTheme }) => {
    const theme = useTheme();
    return (
        <Div sx={styles.stringContainer}>
            <Div
                sx={{
                    ...styles.string,
                    backgroundColor: theme.palette.mode === "dark" ? "white" : "black",
                }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                onDragEnd={(event, info) => {
                    if (info.point.y > window.innerHeight / 3.5) {
                        setTheme((e) => (e === "dark" ? "light" : "dark"));
                    }
                }}
            >
                <Lightbulb
                    sx={{
                        ...styles.bulb,
                        color: theme.palette.mode === "dark" ? "#ffff50" : "#4e4e4e",
                        ":hover": {
                            filter: `drop-shadow(0px 0px 25px ${
                                theme.palette.mode === "dark" ? " #ffffc0" : "#1e1e1e"
                            });`,
                        },
                    }}
                />
            </Div>
        </Div>
    );
};

export default LightSwitch;
