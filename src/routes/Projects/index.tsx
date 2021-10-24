import Project from "../../components/Project/index";
import { ProjectProps } from "../../components/Project/index";
import { Grid, useTheme } from "@mui/material";
import styles from "./styles";

export const Projects = () => {
    const theme = useTheme();
    const PROJECTS: ProjectProps[] = [
        {
            title: "Spotify Card",
            description: "Generate Spotify embeds for any song !",
            github: "https://github.com/cstefFlexin/spotify-card",
            image: "/images/spotify-card.png",
        },
        {
            title: "Kotlin Formatter",
            description: "Format your Kotlin code easily in VScode",
            link: "https://marketplace.visualstudio.com/items?itemName=cstef.kotlin-formatter",
            github: "https://github.com/cstefFlexin/kotlin-formatter",
            image: "https://avatao.com/file/2020/08/1_fnbqF0xNVwINs_RkygkX1g.png",
        },
        {
            title: "Vintools",
            description: "Find your favorite clothes from Vinted® easily !",
            image:
                theme.palette.mode === "dark"
                    ? "/images/logo_vintools.png"
                    : "/images/logo_vintools_dark.png",
            link: "https://vintools.cstef.dev",
        },
        {
            title: "cstef's API",
            description:
                "My personal RESTful API serving endpoints to test out my packages, including a documentation built with swagger-ui !",
            image: "https://haricodes.com/static/e1bcbb481c036882e787d87ac77e6c31/756c3/swagger-ui-angular.png",
            link: "https://api.cstef.dev",
        },
        {
            title: "React JSON Translator",
            description: "Quick i18n translator made in React using Material-UI ",
            github: "https://github.com/cstefFlexin/react-json-translator",
            image: "https://reactjs.org/logo-og.png",
        },
        {
            title: "Web Player",
            description:
                "Play your favorite songs in your browser ! Supports mp3, mp4, m4v, flac, mov and ogg ",
            demo: "https://player.cstef.dev",
            github: "https://github.com/cstefFlexin/web-player",
            image: "https://i.pinimg.com/originals/73/05/37/7305374c6ae8e92347615e659a81ab36.png",
        },

        {
            title: "Auto-Updater",
            description:
                "Update your nodejs app automatically from a remote git repo by checking the package.json version, made in Typescript",
            github: "https://github.com/cstefFlexin/auto-updater",
            image: "/images/ts-512.png",
        },
        {
            title: "cstef.dev",
            description: "Basically this website.",
            github: "https://github.com/cstefFlexin/cstef.dev",
            image: "/android-chrome-512x512.png",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
    ];
    return (
        <Grid container sx={styles.root} spacing={4}>
            {PROJECTS.map((e, i) => (
                <Grid item key={i}>
                    <Project {...e} />
                </Grid>
            ))}
        </Grid>
    );
};
