import { Box, Grid, Typography, useTheme } from "@mui/material";

import Project from "../../components/Project/index";
import { ProjectProps } from "../../components/Project/index";
import styles from "./styles";

export const Projects = () => {
	const theme = useTheme();
	const PROJECTS: ProjectProps[] = [
		{
			title: "cstef.dev",
			description: "Basically this website.",
			github: "https://github.com/cestef/cstef.dev",
			image: "/android-chrome-512x512.png",
			link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
		},
		{
			title: "MeshLink",
			description: "Decentralized communication system via Bluetooth",
			image: "/images/meshlink.png",
			github: "https://github.com/cestef/meshlink",
			link: "https://meshlink.cstef.dev",
		},
		{
			title: "Spotify Card",
			description: "Generate Spotify embeds for any song !",
			image: "/images/spotify-card-2.png",
			github: "https://github.com/cestef/spotify-card",
		},
		{
			title: "Webscraper Exporter",
			description:
				"A simple yet powerful prometheus exporter for website performance metrics built using puppeteer",
			image: "/images/webscraper-exporter.png",
			github: "https://github.com/cestef/webscraper-exporter",
		},
		{
			title: "Kotlin Formatter",
			description: "Format your Kotlin code easily in VScode",
			image: "/images/kotlin-logo.png",
			link: "https://marketplace.visualstudio.com/items?itemName=cstef.kotlin-formatter",
			github: "https://github.com/cestef/kotlin-formatter",
		},
		{
			title: "FACEIT Charts",
			description: "A simple web app to display your FACEIT stats",
			image: "/images/faceit-charts-2.png",
			link: "https://faceit.cstef.dev",
			github: "https://github.com/cestef/faceit-charts",
		},
		{
			title: "Piano LED Visualizer",
			description: "Visualize your music with LEDs !",
			image: "/images/piano-visualizer.png",
			github: "https://github.com/cestef/piano-visualizer",
		},
		// {
		//     title: "Vintools",
		//     description: "Find your favorite clothes from Vinted® easily !",
		//     image:
		//         theme.palette.mode === "dark"
		//             ? "/images/logo_vintools.png"
		//             : "/images/logo_vintools_dark.png",
		//     //link: "https://vintools.cstef.dev",
		// },
		// {
		//     title: "cstef's API",
		//     description:
		//         "My personal RESTful API serving endpoints to test out my packages, including a documentation built with swagger-ui !",
		//     image: "/images/swagger-logo.png",
		//     //link: "https://api.cstef.dev",
		// },
		// {
		//     title: "React JSON Translator",
		//     description: "Quick i18n translator made in React using Material-UI ",
		//     image: "/images/react-logo.png",
		//     github: "https://github.com/cestef/react-json-translator",
		// },
		// {
		//     title: "Auto-Updater",
		//     description:
		//         "Update your nodejs app automatically from a remote git repo by checking the package.json version, made in Typescript",
		//     image: "/images/ts-512.png",
		//     github: "https://github.com/cestef/auto-updater",
		// },

		// {
		// 	title: "Markdown editor",
		// 	description:
		// 		"A quick web markdown editor and previewer built with tailwindCSS",
		// 	github: "https://github.com/cestef/markdown-editor",
		// 	image: `/images/markdown-${
		// 		theme.palette.mode === "dark" ? "white" : "black"
		// 	}.png`,
		// 	link: "https://md.cstef.dev",
		// },
		// {
		// 	title: "Web Player",
		// 	description:
		// 		"Play your favorite songs in your browser ! Supports mp3, mp4, m4v, flac, mov and ogg ",
		// 	image: "/images/player-logo.png",
		// 	demo: "https://player.cstef.dev",
		// 	github: "https://github.com/cestef/web-player",
		// },
	];
	return (
		<Box>
			<Typography variant='h3' color='text.primary' textAlign='center' mt={5}>
				My Projects
			</Typography>
			<Grid container sx={styles.root} spacing={4}>
				{PROJECTS.map((e, i) => (
					<Grid item key={e.title}>
						<Project {...e} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};
