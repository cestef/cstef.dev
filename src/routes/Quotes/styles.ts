import { SxProps, Theme } from "@mui/system";
const styles: { [id: string]: SxProps<Theme> } = {
    root: {
        padding: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    spellerror: {
        textDecorationStyle: "wavy",
        textDecorationLine: "underline",
        textDecorationColor: (theme) => theme.palette.error.main,
    },
};

export default styles;
