import { useState, useEffect, useRef } from "react";
import { Color, generateColors, ColorsCodes, Colors } from "../../functions/mastermind";
import { FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import styles from "./styles";
import { styled, Box } from "@mui/system";
import { Check, RestartAlt, CheckBox } from "@mui/icons-material";
import Comment from "../Comment/index";
import { useTheme } from "@mui/material";
const Div = styled("div")({});
const maxTries = 12;
const Email = () => {
    const toGuess = useRef<Color[]>();
    const [tries, setTries] = useState(0);
    const [history, setHistory] = useState<
        { guessed: Color[]; result: ("white" | "black" | null)[] }[]
    >([]);
    const [guessing, setGuessing] = useState<{ [index: number]: Color | null }>({
        1: null,
        2: null,
        3: null,
        4: null,
    });
    const [emailDisplay, setEmailDisplay] = useState("none");
    const displayEmail = () => {
        setHistory([]);
        setEmailDisplay("block");
    };
    const validate = () => {
        const values = Object.values(guessing);
        if (values.filter(Boolean).length < 4) return;
        if (values.toString() === toGuess.current.toString()) displayEmail();
        else {
            const result = values.map((e, i) =>
                toGuess.current[i] === e
                    ? "black"
                    : toGuess.current.filter((c) => toGuess.current[i] !== c).some((c) => c === e)
                    ? "white"
                    : null
            );
            setHistory((e) => [...e, { guessed: values, result }]);
            if (tries < maxTries - 1) setTries((e) => ++e);
            else {
                alert("You lost ! Restarting a new game");
                restart();
            }
        }
    };
    const restart = () => {
        setEmailDisplay("none");
        toGuess.current = generateColors(4);
        setTries(0);
        setHistory([]);
        setGuessing({ 1: null, 2: null, 3: null, 4: null });
    };

    const theme = useTheme();
    useEffect(() => {
        toGuess.current = generateColors(4);
    }, []);
    return (
        <Div sx={styles.root}>
            <Typography color="text.primary" sx={styles.tries} variant="h5">
                {tries}/{maxTries}
            </Typography>
            {/* <Div sx={styles.answer}>
                {toGuess.map((e) => (
                    <svg height="100" width="100">
                        <circle
                            cx="50"
                            cy="50"
                            r="20"
                            stroke="black"
                            stroke-width="3"
                            fill={ColorsCodes[e]}
                        />
                    </svg>
                ))}
            </Div> */}
            <Comment text="What are you doing here, cheater !" />
            <Typography sx={{ display: emailDisplay, mb: 3 }} variant="h4" color="text.primary">
                colin@petit-suisse.fr
            </Typography>
            <Div sx={styles.history}>
                {history.map((e, i) => (
                    <Div sx={styles.historyItem}>
                        <Typography color="text.primary" variant="body1" sx={{ mt: 0.5 }}>
                            {i + 1}.
                        </Typography>
                        {e.result.map((c) =>
                            c === "black" ? (
                                <CheckBox fontSize="large" sx={{ color: "text.primary" }} />
                            ) : (
                                <svg height="32" width="32">
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="10"
                                        stroke="black"
                                        stroke-width="3"
                                        fill={c}
                                    />
                                </svg>
                            )
                        )}
                        <Div
                            sx={{ ...styles.divider, backgroundColor: theme.palette.text.primary }}
                        />
                        {e.guessed.map((c) => (
                            <svg height="32" width="32">
                                <circle
                                    cx="16"
                                    cy="16"
                                    r="10"
                                    stroke="black"
                                    stroke-width="3"
                                    fill={ColorsCodes[c]}
                                />
                            </svg>
                        ))}
                    </Div>
                ))}
            </Div>
            <Box sx={styles.colors}>
                <IconButton size="large" sx={styles.restart} onClick={restart}>
                    <RestartAlt fontSize="large" />
                </IconButton>
                {[1, 2, 3, 4].map((n) => (
                    <FormControl sx={styles.input}>
                        <InputLabel>Color {n}</InputLabel>
                        <Select
                            value={guessing[n]}
                            label={`Color ${n}`}
                            onChange={(e) =>
                                setGuessing((g) => ({ ...g, [n]: e.target.value as Color }))
                            }
                        >
                            {Colors.map((e) => (
                                <MenuItem value={e}>
                                    <svg height="32" width="32">
                                        <circle
                                            cx="16"
                                            cy="16"
                                            r="10"
                                            stroke="black"
                                            stroke-width="3"
                                            fill={ColorsCodes[e]}
                                        />
                                    </svg>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ))}
                <IconButton size="large" sx={styles.check} onClick={validate}>
                    <Check fontSize="large" />
                </IconButton>
            </Box>
        </Div>
    );
};

export default Email;
