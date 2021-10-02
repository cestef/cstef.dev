import { SxProps, Theme } from "@mui/system";
const styles: { [id: string]: SxProps<Theme> } = {
    root: {
        display: "flex",
        flexDirection: "column",
    },
    title: {
        mb: 5,
    },
    paragraph: {
        mb: 1,
        fontSize: 23,
        color: "#eee",
    },
    container: {
        mt: 5,
    },
};
export default styles;
