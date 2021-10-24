import styles from "./styles";
import { styled } from "@mui/material";

const Img = styled("img")({});

const ImageEmoji = ({ src, alt }: { src: string; alt: string }) => {
    return (
        <span>
            <Img sx={styles.root} src={src} alt={alt} />
        </span>
    );
};

export default ImageEmoji;
