import { SxProps, Theme } from "@mui/system";
const styles: { [id: string]: SxProps<Theme> } = {
    subtitle: {
        margin: "20px 0px",
        fontSize: 34,
        color: "text.primary",
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
        color: "text.primary",
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
        boxShadow:
            "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;",
    },
};
export default styles;
