import { SxProps, Theme } from "@mui/system";
const styles: { [id: string]: SxProps<Theme> } = {
    root: {
        display: "flex",
        flexDirection: "column",
        color: "text.primary",
    },
    title: {
        mb: 5,
    },
    paragraph: {
        mb: 1,
        fontSize: 23,
        color: "text.primary",
    },
    container: {
        maxWidth: 600,
        padding: 5,
        m: 5,
    },
};
export default styles;
