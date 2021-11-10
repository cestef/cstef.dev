import { SxProps, Theme } from "@mui/system";
const styles: { [id: string]: SxProps<Theme> } = {
    root: {
        textDecorationStyle: "wavy",
        textDecorationLine: "underline",
        textDecorationColor: (theme) => theme.palette.error.main,
    },
};
export default styles;
