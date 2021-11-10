import { useState, useEffect, useRef } from "react";
import { Color, generateColors, ColorsCodes, Colors } from "../../utils/mastermind";
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
import { Box } from "@mui/system";
import { Check, RestartAlt, CheckBox } from "@mui/icons-material";
import Comment from "../Comment/index";
import { useTheme } from "@mui/material";
import { Confetti } from "../Confetti";
import { Vector2 } from "../../utils/Vector2";

const maxTries = 12;
const length = 5;

const Email = () => {
    const toGuess = useRef<Color[]>();
    const [displayConfetti, setDisplayConfetti] = useState(false);
    const [copied, setCopied] = useState(false);
    const [tries, setTries] = useState(0);
    const [history, setHistory] = useState<
        { guessed: Color[]; result: ("white" | "black" | null)[] }[]
    >([]);
    const [guessing, setGuessing] = useState<{ [index: number]: Color | null }>({});
    const [emailDisplay, setEmailDisplay] = useState(false);
    const displayEmail = () => {
        setHistory([]);
        setEmailDisplay(true);
    };
    const timeoutCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const validate = () => {
        const values = Object.values(guessing).map((e) => (e === "None" ? null : e));
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
        if (values.toString() === toGuess.current.toString()) {
            displayEmail();
            setDisplayConfetti(true);
        }
    };
    const restart = () => {
        setEmailDisplay(false);
        toGuess.current = generateColors(length);
        setTries(0);
        setHistory([]);
        let empty = {};
        for (let i = 0; i < length; i++) empty = { ...empty, [i]: "None" };
        setGuessing(empty);
    };
    const theme = useTheme();
    const getEmail = () =>
        [
            99, 111, 108, 105, 110, 64, 112, 101, 116, 105, 116, 45, 115, 117, 105, 115, 115, 101,
            46, 102, 114,
        ]
            .map((e) => String.fromCharCode(e))
            .join("");
    useEffect(() => {
        toGuess.current = generateColors(length);
    }, []);
    console.log(guessing);
    return (
        <Box sx={styles.root}>
            <Typography color="text.primary" sx={styles.tries} variant="h5">
                <code>
                    {tries}/{maxTries}
                </code>{" "}
                attempt{tries > 1 ? "s" : ""}
            </Typography>
            <Comment text="What are you doing here, cheater !" />
            <Box>
                {displayConfetti && (
                    <Confetti
                        launchPoints={[
                            () => ({
                                x: window.innerWidth / 2,
                                y: window.innerHeight,
                                angle: 0,
                                spreadAngle: 1,
                            }),
                            () => ({
                                x: 0,
                                y: window.innerHeight,
                                angle: -0.5,
                                spreadAngle: 1,
                            }),
                            () => ({
                                x: window.innerWidth,
                                y: window.innerHeight,
                                angle: 0.5,
                                spreadAngle: 1,
                            }),
                        ]}
                        afterBurstAmount={10}
                        gravity={new Vector2(0, 0.35)}
                        onEnd={() => setDisplayConfetti(false)}
                    />
                )}
                {emailDisplay && (
                    <Tooltip
                        title={
                            <Typography variant="body1">
                                {copied ? "Copied !" : "Click to copy"}
                            </Typography>
                        }
                        placement="right"
                    >
                        <Typography
                            sx={{ mb: 3, cursor: "pointer" }}
                            variant="h4"
                            color="text.primary"
                            onClick={() => {
                                navigator.clipboard.writeText(getEmail());
                                timeoutCopy();
                            }}
                        >
                            {getEmail()}
                        </Typography>
                    </Tooltip>
                )}
            </Box>
            <Box sx={styles.history}>
                {history.map((e, i) => (
                    <Box sx={styles.historyItem}>
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
                                            strokeWidth="3"
                                            fill={c}
                                        />
                                    </svg>
                                </Tooltip>
                            )
                        )}
                        <Box
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
                    </Box>
                ))}
            </Box>
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
                                variant="outlined"
                            >
                                <MenuItem value={"None"}>None</MenuItem>
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
        </Box>
    );
};

export default Email;
