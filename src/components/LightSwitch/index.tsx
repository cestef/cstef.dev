import { AnimatePresence, motion } from "framer-motion";
import styles from "./styles";
import { Box, useTheme } from "@mui/material";
import { KeyboardArrowDown, Lightbulb } from "@mui/icons-material";
import { useRef } from "react";
import { styled } from "@mui/system";

const Div = styled(motion.div)({});

const LightSwitch = ({ setTheme }) => {
    const theme = useTheme();
    const switching = useRef(false);
    return (
        <AnimatePresence>
            <Box sx={styles.stringContainer}>
                <Div
                    animate={{ y: [0, 7, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    sx={{
                        ...styles.string,
                        backgroundColor: theme.palette.mode === "dark" ? "white" : "black",
                    }}
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 0 }}
                    onDragEnd={(_, info) => {
                        if (info.point.y > window.innerHeight / 3.5) {
                            switching.current = true;
                        }
                    }}
                    onDragTransitionEnd={() => {
                        if (switching.current) {
                            setTheme((e) => (e === "dark" ? "light" : "dark"));
                            switching.current = false;
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
                        id="light-switch"
                    />
                    <Div
                        animate={{ y: [0, 7, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        sx={{ position: "absolute", bottom: -75 }}
                    >
                        <KeyboardArrowDown sx={{ color: "text.primary" }} />
                    </Div>
                </Div>
            </Box>
        </AnimatePresence>
    );
};

export default LightSwitch;
