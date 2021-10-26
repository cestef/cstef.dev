import { SxProps, Theme } from "@mui/system";
const styles: { [id: string]: SxProps<Theme> } = {
    stringContainer: {
        position: "absolute",
        right: "10vw",
        top: "-40vh",
        zIndex: 11,
    },
    string: {
        display: ["none", null, "flex"],
        width: "2px",
        height: "50vh",
        position: "relative",
        alignItems: "flex-end",
        justifyContent: "center",
        borderRadius: 5,
    },
    bulb: {
        display: ["none", null, "block"],
        rotate: "180deg",
        position: "absolute",
        fontSize: "4rem",
        bottom: -54,
        cursor: "pointer",
    },
};
export default styles;
