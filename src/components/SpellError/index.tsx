import { styled } from "@mui/system";
import styles from "./styles";
const Span = styled("span")({});
const SpellError = ({ children }) => {
    return <Span sx={styles.root}>{children}</Span>;
};

export default SpellError;
