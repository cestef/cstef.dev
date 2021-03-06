import { SxProps, Theme } from "@mui/system";
const styles: { [id: string]: SxProps<Theme> } = {
    subtitle: {
        margin: "20px 0px",
        fontSize: 34,
        color: "text.primary",
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
        color: "text.primary",
    },
    buttons: {
        marginTop: 5,
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
        boxShadow: 3,
        userSelect: "none",
    },
};
export default styles;
