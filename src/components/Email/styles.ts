import { SxProps, Theme } from "@mui/system";
const styles: { [id: string]: SxProps<Theme> } = {
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    answer: {
        display: "flex",
        flexDirection: "row",
        padding: 2,
    },
    item: {
        padding: 1,
    },
    tries: {
        my: 5,
    },
    colors: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        flexDirection: "row",
    },
    input: {
        m: 1,
        width: [50, 100],
    },
    check: {
        ml: 1,
    },
    history: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mb: 5,
    },
    historyItem: {
        display: "flex",
        flexDirection: "row",
        mt: 0.75,
    },
    restart: {
        mr: 1,
    },
    divider: {
        height: "2em",
        width: "1px",
        mx: 1.5,
    },
};
export default styles;
