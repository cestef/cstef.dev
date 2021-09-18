import { SxProps, Theme } from "@mui/system";
const styles: { [id: string]: SxProps<Theme> } = {
    subtitle: {
        margin: "20px 0px",
        fontSize: 34,
        color: "#ccc",
    },
    spellerror: {
        textDecorationStyle: "wavy",
        textDecorationLine: "underline",
        textDecorationColor: (theme) => theme.palette.error.main,
    },
    root: {
        padding: 10,
        display: ["flex", null, "inherit"],
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    content: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
    },
    paragraph: {
        margin: "20px 0px",
        fontSize: 30,
        color: "#ddd",
    },
    buttons: {
        marginTop: 5,
    },
    button: {
        margin: 1,
        padding: [1, 3],
    },
    codeBlock: {
        padding: "1.5em !important",
        borderRadius: 5,
        marginBottom: 10,
        fontSize: 20,
        marginLeft: [null, null, 10],
        maxWidth: 500,
        float: [null, null, "right"],
        display: ["none !important", null, "block !important"],
    },
};
export default styles;
