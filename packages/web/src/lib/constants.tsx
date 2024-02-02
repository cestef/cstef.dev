import { Link } from "@/components/ui/link";
import Twemoji from "@/components/ui/twemoji";
import { FaDiscord, FaGithub, FaSpotify, FaSteam } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const SOCIALS: {
	name: string;
	url: string;
	icon: React.ReactNode;
	variant: "copy" | "link" | "spotify";
}[] = [
	{
		name: "GitHub",
		url: "https://github.com/cestef",
		icon: <FaGithub className="sm:w-10 sm:h-10 w-8 h-8" />,
		variant: "link",
	},
	{
		name: "Discord",
		url: "cstef",
		icon: <FaDiscord className="sm:w-10 sm:h-10 w-8 h-8 text-[#5865F2]" />,
		variant: "copy",
	},
	{
		name: "X",
		url: "https://x.com/cishtef",
		icon: <FaXTwitter className="sm:w-10 sm:h-10 w-8 h-8" />,
		variant: "link",
	},
	{
		name: "Spotify",
		url: "https://open.spotify.com/user/dyt7pgmjts2a5u8mtttix4jho",
		icon: <FaSpotify className="sm:w-10 sm:h-10 w-8 h-8 text-[#1DB954]" />,
		variant: "spotify",
	},
	{
		name: "Steam",
		url: "https://steamcommunity.com/id/cishtef",
		icon: <FaSteam className="sm:w-10 sm:h-10 w-8 h-8 text-blue-950 dark:text-white" />,
		variant: "link",
	},
	{
		name: "Blog",
		url: "https://blog.cstef.dev",
		icon: <Twemoji emoji="📝" className="sm:w-10 sm:h-10 w-8 h-8" />,
		variant: "link",
	},
];
export const EVENTS: {
	title: string;
	description: string | React.ReactNode;
	date: string;
	icon?: React.ReactNode;
}[] = [
	{
		title: "Beginnings",
		description:
			"I was very creative as a child, I loved building Legos and thus I began imaginating systems (that never worked) and fantasizing at big constructions when shopping.",
		date: "2005",
	},
	{
		title: "Messing around",
		description: (
			<>
				Where it all began. My father showed me a block-programming platform named{" "}
				<Link href="https://scratch.mit.edu">Scratch</Link>.
			</>
		),
		date: "2013",
	},
	{
		title: "Getting serious",
		description: (
			<>
				I programmed useful things for the first time in real life with{" "}
				<Link href="https://mblock.makeblock.com">mBlock</Link>.
			</>
		),
		date: "2014",
	},
	{
		title: 'First steps into the "Real World"',
		description:
			"During a trip to Italy, with the idea of a Discord bot, a raspberry PI and the TV in the hotel room, I started to create my first program in JavaScript.",
		date: "2018",
	},
	{
		title: "Types, Types everywhere !",
		description:
			"After creating Discord bots over and over again, I discovered TypeScript: JavaScript with syntax for types.",
		date: "2018",
	},
	{
		title: "Mine BOT",
		description:
			"My first serious project. This took me way too long, but it also allowed me to discover what having a community is like and the duty to maintain a project.",
		date: "2019",
	},
	{
		title: "My first job",
		description:
			"Despite COVID, I was able to find a summer job at a local IT company. I worked there as a field technician, even though it was pretty exhausting and a bit boring sometimes, I had a lot of fun and learned many new things.",
		date: "2020",
	},
	{
		title: "First job as a dev !",
		description:
			"I managed to find another small job, this time at Swisscom, the biggest IT company in Switzerland. My project was to develop a Full-Stack app using React, the team there was amazing and we got along pretty well !",
		date: "2021",
	},
	{
		title: "Experiencing other domains",
		description: (
			<>
				Out of curiosity, I started to learn about new domains such as Game Development,
				which lead me to join{" "}
				<Link href="https://itch.io/jam/brackeys-8/rate/1680462">Brackey's jam</Link> and
				collaborate with amazing people on a game. We were very proud of the result (Placed{" "}
				<b>6th</b> out of <b>1000+</b> games).
			</>
		),
		date: "2022",
	},
	{
		title: "And now what ?",
		description:
			"I am currently studying at High School, waiting for the days to finish and get back home programming. I'm planning to continue my studies in the IT branch but I'm not sure which one yet ¯\\_(ツ)_/¯",
		date: "Today",
	},
];

export const EMAIL = "114,111,111,116,64,99,115,116,101,102,46,100,101,118"
	.split(",")
	.map((char) => String.fromCharCode(parseInt(char)))
	.join("");
export const FILE_TREE: Dir = {
	type: "dir",
	name: "root",
	children: [
		{
			type: "dir",
			name: "home",
			children: [
				{
					type: "dir",
					name: "cstef",
					children: [
						{
							type: "dir",
							name: "owo",
							children: [
								{
									type: "file",
									name: "README",
									content: `I don't think I even need to explain what this is, do I ?`,
									contentType: "text/plain",
								},
								{
									type: "file",
									name: "main",
									path: "/assets/main",
									contentType: "application/x-executable",
								},
							],
						},
						{
							type: "dir",
							name: "black",
							children: [
								{
									type: "file",
									name: "README",
									content: `Don't worry, these are just zeros and ones, nothing to be scared of :3`,
									contentType: "text/plain",
								},
								{
									type: "file",
									name: "white.bin",
									path: "/assets/white.bin",
									contentType: "application/octet-stream",
								},
							],
						},
						{
							type: "dir",
							name: "music",
							children: [
								{
									type: "file",
									name: "README",
									content: `I wonder how people managed to fit images in audio back in the day... 🤔`,
									contentType: "text/plain",
								},
								{
									type: "file",
									name: "beep.wav",
									path: "/assets/beep.wav",
									contentType: "application/octet-stream",
								},
							],
						},
						{
							type: "file",
							name: "poem.txt",
							path: "/assets/poem.txt",
							contentType: "text/plain",
						},
						{
							type: "file",
							name: "mycert.csr",
							path: "/assets/mycert.csr",
							contentType: "text/plain",
						},
						{
							type: "file",
							name: "silly_cat.png",
							path: "/assets/silly_cat.png",
							contentType: "image/png",
						},
						{
							type: "file",
							name: "meow.png",
							path: "/assets/meow.png",
							contentType: "image/png",
						},
						{
							type: "file",
							name: "README",
							content: `Hi there 👋
It looks like you found this file, I'm not sure how you did it but congrats !
I may or may not have hidden some other secrets on this website, try to find them all !
Hint: Type "help" in the terminal to get started.`,
							contentType: "text/plain",
						},
					],
				},
			],
		},
	],
};

export interface File {
	type: "file";
	name: string;
	content?: string;
	path?: string;
	contentType?: string;
}

export interface Dir {
	type: "dir";
	name: string;
	children: (File | Dir)[];
}
