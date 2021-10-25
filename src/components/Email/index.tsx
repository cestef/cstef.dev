import { useState, useEffect, useRef } from "react";
import { Color, generateColors, ColorsCodes, Colors } from "../../functions/mastermind";
import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Tooltip,
    Typography,
} from "@mui/material";
import styles from "./styles";
import { styled, Box } from "@mui/system";
import { Check, RestartAlt, CheckBox } from "@mui/icons-material";
import Comment from "../Comment/index";
import { useTheme } from "@mui/material";
const Div = styled("div")({});
const maxTries = 12;
const length = 5;

const Email = () => {
    const toGuess = useRef<Color[]>();
    const [tries, setTries] = useState(0);
    const [history, setHistory] = useState<
        { guessed: Color[]; result: ("white" | "black" | null)[] }[]
    >([]);
    const [guessing, setGuessing] = useState<{ [index: number]: Color | null }>({});
    const [emailDisplay, setEmailDisplay] = useState("none");
    const displayEmail = () => {
        setHistory([]);
        setEmailDisplay("block");
    };
    const validate = () => {
        const values = Object.values(guessing);
        if (values.filter(Boolean).length < length) return;
        const found = values
            .map((e, i) => ({ color: e, i }))
            .filter((e, i) => toGuess.current[i] === e.color);
        const goodColors = values
            .map((e, i) => ({ color: e, i }))
            .filter((_, i) => !found.some((e) => e.i === i))
            .filter((e) =>
                toGuess.current
                    .filter((_, i) => !found.some((e) => e.i === i))
                    .some((c) => c === e.color)
            )
            .map((e) => ({ ...e, origin: toGuess.current.findIndex((c) => c === e.color) }));
        let result = [];
        for (let i = 0; i < length; i++)
            result.push(
                found.find((e) => e.i === i)
                    ? "black"
                    : goodColors.find((e) => e.i === i)
                    ? "white"
                    : null
            );
        setHistory((e) => [...e, { guessed: values, result }]);
        if (tries < maxTries - 1) setTries((e) => ++e);
        else {
            alert("You lost ! Starting a new game");
            restart();
            return;
        }
        if (values.toString() === toGuess.current.toString()) displayEmail();
    };
    const restart = () => {
        setEmailDisplay("none");
        toGuess.current = generateColors(length);
        setTries(0);
        setHistory([]);
        setGuessing({});
    };

    const theme = useTheme();
    useEffect(() => {
        toGuess.current = generateColors(length);
    }, []);
    return (
        <Div sx={styles.root}>
            <Typography color="text.primary" sx={styles.tries} variant="h5">
                <code>
                    {tries}/{maxTries}
                </code>{" "}
                attempt{tries > 1 ? "s" : ""}
            </Typography>
            {/* <Div sx={styles.answer}>
                {toGuess.current?.map((e) => (
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
            <Tooltip
                title={<Typography variant="body1">Click to copy</Typography>}
                placement="right"
            >
                <Typography
                    sx={{ display: emailDisplay, mb: 3, cursor: "pointer" }}
                    variant="h4"
                    color="text.primary"
                    onClick={() => {
                        navigator.clipboard.writeText("colin@petit-suisse.fr");
                    }}
                >
                    colin@petit-suisse.fr
                </Typography>
            </Tooltip>
            <Div sx={styles.history}>
                {history.map((e, i) => (
                    <Div sx={styles.historyItem}>
                        <Typography color="text.primary" variant="body1" sx={{ mt: 0.5 }}>
                            {i + 1}.
                        </Typography>
                        {e.result.map((c) =>
                            c === "black" ? (
                                <Tooltip title={"Correct color and place"}>
                                    <CheckBox fontSize="large" sx={{ color: "text.primary" }} />
                                </Tooltip>
                            ) : (
                                <Tooltip
                                    title={
                                        c === "white"
                                            ? "Correct color, but wrong place"
                                            : "Wrong color and wrong place"
                                    }
                                >
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
                                </Tooltip>
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
                                    strokeWidth="3"
                                    fill={ColorsCodes[c]}
                                />
                            </svg>
                        ))}
                    </Div>
                ))}
            </Div>
            <Box sx={styles.colors}>
                <Tooltip title={<Typography variant="body1">Start over</Typography>}>
                    <IconButton size="large" sx={styles.restart} onClick={restart}>
                        <RestartAlt fontSize="large" />
                    </IconButton>
                </Tooltip>
                {new Array(length)
                    .fill(null)
                    .map((_, i) => i + 1)
                    .map((n, i) => (
                        <FormControl sx={styles.input} key={i}>
                            <InputLabel>Color {n}</InputLabel>
                            <Select
                                value={guessing[n]}
                                label={`Color ${n}`}
                                onChange={(e) =>
                                    setGuessing((g) => ({ ...g, [n]: e.target.value as Color }))
                                }
                            >
                                {Colors.map((e, i) => (
                                    <MenuItem value={e} key={i}>
                                        <svg height="32" width="32">
                                            <circle
                                                cx="16"
                                                cy="16"
                                                r="10"
                                                stroke="black"
                                                strokeWidth="3"
                                                fill={ColorsCodes[e]}
                                            />
                                        </svg>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ))}
                <Tooltip title={<Typography variant="body1">Validate answer</Typography>}>
                    <IconButton size="large" sx={styles.check} onClick={validate}>
                        <Check fontSize="large" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Div>
    );
};

export default Email;
