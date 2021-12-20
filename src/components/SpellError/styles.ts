import { SxProps, Theme, keyframes } from "@mui/system";

const move = keyframes`
    from {
        background-position-x: 2px;
    }
    to {
        background-position-x: 500px;
    }
`;

const styles: { [id: string]: SxProps<Theme> } = {
    root: {
        // textDecorationStyle: "wavy",
        // textDecorationLine: "underline",
        // textDecorationColor: (theme) => theme.palette.error.main,
        animationPlayState: "paused !important",
        animation: `${move} 15s linear infinite`,
        "&:hover": {
            animationPlayState: "running !important",
        },
        background: 'url("/images/wave.svg")',
        backgroundRepeat: "repeat-x",
        backgroundSize: "25px 8px",
        paddingBottom: 8,
        backgroundPositionX: "0%",
        backgroundPositionY: "0%",
        backgroundPosition: "2px 1em",
        backgroundColor: "transparent",
    },
};
export default styles;
