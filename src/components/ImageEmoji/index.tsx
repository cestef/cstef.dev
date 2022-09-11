import { Tooltip, Typography, styled } from "@mui/material";

import styles from "./styles";

const Img = styled("img")({});

const ImageEmoji = ({ src, alt, title }: { src: string; alt: string; title?: string }) => {
    return (
        <Tooltip title={<Typography>{title || alt}</Typography>} arrow>
            <Img sx={styles.root} src={src} alt={alt} />
        </Tooltip>
    );
};

export default ImageEmoji;
