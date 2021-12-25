import { IconButton } from "@mui/material";
import styles from "./styles";

const ButtonLink = ({ children, href }) => {
    return (
        <IconButton size="large" sx={styles.root} href={href}>
            {children}
        </IconButton>
    );
};

export default ButtonLink;

// "https://discord.com/users/699912716474777631"
