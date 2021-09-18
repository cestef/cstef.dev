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
        padding: 3,
    },
    codeBlock: {
        borderRadius: 5,
        marginBottom: 10,
        fontSize: 20,
        marginLeft: 10,
    },
};
export default styles;
