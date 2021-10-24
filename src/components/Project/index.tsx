import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import styles from "./styles";
export interface ProjectProps {
    title: string;
    description: string;
    github?: string;
    demo?: string;
    link?: string;
    image?: string;
}

const Project = ({ title, description, github, demo, link, image }: ProjectProps) => {
    return (
        <Card elevation={3} sx={styles.root}>
            {image && (
                <CardMedia component="img" sx={styles.image} image={image} alt="Project image" />
            )}

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            {(demo || link || github) && (
                <CardActions>
                    {demo && (
                        <Button size="small" color="primary" href={demo}>
                            Demo
                        </Button>
                    )}
                    {link && (
                        <Button size="small" color="primary" href={link}>
                            Link
                        </Button>
                    )}
                    {github && (
                        <Button size="small" color="primary" href={github}>
                            Github
                        </Button>
                    )}
                </CardActions>
            )}
        </Card>
    );
};

export default Project;
