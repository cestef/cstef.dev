import { Link } from "@/components/ui/link";
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
			"I was very creative as a child, I loved building Legos and thus I began imaginating systems (that never worked) and fantasizing at big constructions when shopping",
		date: "2005",
	},
	{
		title: "Messing around",
		description: (
			<>
				Where it all began. My father showed me a block-programming platform named{" "}
				<Link href="https://scratch.mit.edu">Scratch</Link>
			</>
		),
		date: "2013",
	},
	{
		title: "Getting serious",
		description: (
			<>
				I programmed useful things for the first time in real life with{" "}
				<Link href="https://mblock.makeblock.com">mBlock</Link>
			</>
		),
		date: "2014",
	},
	{
		title: 'First steps into the "Real World"',
		description:
			"During a trip to Italy, with the idea of a Discord bot, a raspberry PI and the TV in the hotel room, I started to create my first program in JavaScript",
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
			"My first serious project. I spent too much time on this, but this allowed me to discover what having a community is like and the duty to maintain a project.",
		date: "2019",
	},
	{
		title: "My first job",
		description:
			"I was able to find an internship despite COVID at a local IT company. I worked there as a field technician, even though it was pretty exhausting and a bit boring sometimes, I had a lot of fun and learned lot of things.",
		date: "2020",
	},
	{
		title: "First job as a web-dev !",
		description:
			"I managed to find another internship, this time at Swisscom, one of the biggest IT company in Switzerland. I helped developing a Full-Stack app using React, the team there was amazing and we got along pretty well !",
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
				<b>6th</b> out of <b>1000+</b> games) and learned a lot of things.
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

export const EMAIL =
	"99,111,108,105,110,64,112,101,116,105,116,45,115,117,105,115,115,101,46,102,114"
		.split(",")
		.map((char) => String.fromCharCode(parseInt(char)))
		.join("");
