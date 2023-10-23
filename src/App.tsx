import { motion } from "framer-motion";
import { ArrowUpRight, Copy, FileDown, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { FaDiscord, FaGithub, FaSteam, FaTwitter } from "react-icons/fa";
import LightSwitch from "./components/composed/light-switch";
import { ModeToggle } from "./components/composed/mode-toggle";
import Terminal from "./components/composed/terminal";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./components/ui/tooltip";
import Twemoji from "./components/ui/twemoji";
import { Button } from "./components/ui/button";
import { cn } from "./lib/utils";

const SOCIALS: {
	name: string;
	url: string;
	icon: React.ReactNode;
	variant: "copy" | "link";
}[] = [
	{
		name: "GitHub",
		url: "https://github.com/cestef",
		icon: <FaGithub className="sm:w-10 sm:h-10 w-8 h-8" />,
		variant: "link",
	},
	{
		name: "Twitter",
		url: "https://twitter.com/cishtef",
		icon: <FaTwitter className="sm:w-10 sm:h-10 w-8 h-8 text-blue-500" />,
		variant: "link",
	},
	{
		name: "Steam",
		url: "https://steamcommunity.com/id/cishtef",
		icon: <FaSteam className="sm:w-10 sm:h-10 w-8 h-8 text-blue-950 dark:text-white" />,
		variant: "link",
	},
	{
		name: "Discord",
		url: "cstef",
		icon: <FaDiscord className="sm:w-10 sm:h-10 w-8 h-8 text-[#5865F2]" />,
		variant: "copy",
	},
];

interface Repository {
	name: string;
	url: string;
	description: string;
	stars: number;
	lastUpdate: string;
	forked: boolean;
}

export default function App() {
	const [repositories, setRepositories] = useState<Repository[]>([]);
	const [page, setPage] = useState(1);
	const [copied, setCopied] = useState(false);
	const [open, setOpen] = useState<string | false>(false);
	const [dragging, setDragging] = useState(false);

	useEffect(() => {
		fetch(
			`https://api.github.com/users/cestef/repos?sort=updated&direction=desc&per_page=8&page=${page}`
		)
			.then((res) => res.json())
			.then((data) => {
				setRepositories((e) =>
					e.concat(
						data
							.map(
								(repo: {
									name: string;
									html_url: string;
									description: string;
									stargazers_count: number;
									updated_at: string;
									fork: boolean;
								}) => ({
									name: repo.name,
									url: repo.html_url,
									description: repo.description,
									stars: repo.stargazers_count,
									lastUpdate: repo.updated_at,
									forked: repo.fork,
								})
							)
							.filter((repo: Repository) => !e.find((r) => r.name === repo.name))
					)
				);
			});
	}, [page]);
	return (
		<>
			<header className="flex justify-between items-center py-4 sm:py-6 px-6 sm:px-8 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-background/70 z-10 mb-32">
				<a href="/">
					<h1 className="text-2xl sm:text-3xl font-bold">
						<Twemoji emoji="👨‍💻" className="mr-3 w-8 h-8" />
						cstef.dev
					</h1>
				</a>
				<ModeToggle className="md:hidden" />
				<LightSwitch />
			</header>
			<main
				className={cn(
					"container mx-2 xl:mx-auto px-6 flex flex-col justify-between items-center",
					{
						"select-none": dragging,
					}
				)}
			>
				<div className="w-full h-full flex lg:block flex-col items-center">
					<div className="float-left">
						<div className="text-7xl sm:text-8xl font-bold mb-10 justify-center md:justify-start flex flex-wrap">
							<motion.h2
								animate={{ scale: [0.0, 1] }}
								transition={{
									type: "spring",
									stiffness: 300,
									damping: 20,
									delay: 0.5,
								}}
							>
								Hello,
							</motion.h2>{" "}
							<motion.h2
								animate={{ scale: [0.0, 1] }}
								transition={{
									type: "spring",
									stiffness: 300,
									damping: 20,
									delay: 1.5,
								}}
							>
								World{"\u00A0"}!
							</motion.h2>
						</div>

						<p className="text-3xl sm:text-4xl font-medium text-muted-foreground mb-3">
							<div className="flex flex-wrap gap-2 justify-center md:justify-start">
								I'm a <Bold>developer</Bold> from{" "}
								<Bold>
									Switzerland{" "}
									<Twemoji emoji="🇨🇭" className="sm:w-10 sm:h-10 w-8 h-8" />
								</Bold>
							</div>
						</p>
						<Button variant="outline" size="jumbo" className="w-full mt-6">
							<FileDown className="w-5 h-5 mr-3 inline-block" />
							Download Resume
						</Button>
					</div>
					<div className="lg:float-right flex items-center justify-center lg:block">
						<Terminal setDragging={setDragging} />
					</div>
				</div>
				<div className="lg:mt-32 flex flex-col justify-center items-center">
					<motion.h2
						animate={{ scale: [0.2, 1] }}
						transition={{ type: "spring", stiffness: 300, damping: 20 }}
						className="text-3xl sm:text-4xl font-bold mb-10"
					>
						Find me on
					</motion.h2>
					<div className="flex flex-row justify-center items-center gap-4 mx-4">
						{SOCIALS.map((social, index) => (
							<Tooltip key={index} delayDuration={0} open={open === social.name}>
								<TooltipTrigger
									onPointerEnter={() => setOpen(social.name)}
									onPointerLeave={() => setOpen(false)}
								>
									{social.variant === "copy" ? (
										<motion.div
											className="flex flex-row justify-center items-center gap-2 bg-accent rounded-3xl p-4 md:p-6 shadow-sm"
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
											initial={{ opacity: 0 }}
											whileInView={{ opacity: 1 }}
											viewport={{ once: true }}
											onClick={() => {
												navigator.clipboard.writeText(social.url);
												setCopied(true);
												setTimeout(() => setCopied(false), 5000);
											}}
										>
											{social.icon}
										</motion.div>
									) : (
										<a
											href={social.url}
											children={
												<motion.div
													className="flex flex-row justify-center items-center gap-2 bg-accent rounded-3xl p-4 md:p-6 shadow-sm"
													whileHover={{ scale: 1.1 }}
													whileTap={{ scale: 0.9 }}
													initial={{ opacity: 0 }}
													whileInView={{ opacity: 1 }}
													viewport={{ once: true }}
												>
													{social.icon}
												</motion.div>
											}
										/>
									)}
								</TooltipTrigger>
								<TooltipContent className="mb-2">
									{social.variant === "copy" ? (
										<>
											<Copy className="w-4 h-4 mr-2 inline-block" />
											{copied ? "Copied!" : "Copy"}
										</>
									) : (
										<>
											<ArrowUpRight className="w-4 h-4 mr-2 inline-block" />
											{social.name}
										</>
									)}
								</TooltipContent>
							</Tooltip>
						))}
					</div>
				</div>
				<div className="mt-32 flex flex-col justify-center items-center">
					<motion.h2
						whileInView={{ scale: [0.2, 1] }}
						viewport={{ once: true }}
						transition={{ type: "spring", stiffness: 300, damping: 20 }}
						className="text-3xl sm:text-4xl font-bold mb-10"
					>
						Latest repositories
					</motion.h2>
					<div className="flex flex-wrap justify-center items-center gap-4 mx-4">
						{repositories.map((repo, index) => (
							<Tooltip key={index} delayDuration={0}>
								<TooltipTrigger>
									<a href={repo.url}>
										<motion.div
											whileTap={{ scale: 0.95 }}
											initial={{ opacity: 0 }}
											whileInView={{ opacity: 1 }}
											viewport={{ once: true }}
										>
											<Card className="w-72 h-36">
												<CardHeader className="-mb-2">
													<CardTitle className="truncate">
														{repo.forked && (
															<Tooltip delayDuration={0}>
																<TooltipTrigger>
																	<Twemoji
																		emoji="🍴"
																		className="mr-2"
																	/>
																</TooltipTrigger>
																<TooltipContent>
																	Forked
																</TooltipContent>
															</Tooltip>
														)}
														{repo.name}
													</CardTitle>
												</CardHeader>
												<CardContent>
													<p className="truncate text-muted-foreground">
														{repo.description}
													</p>
													<p className="mt-2">
														{repo.stars} <Twemoji emoji="⭐" />
													</p>
												</CardContent>
											</Card>
										</motion.div>
									</a>
								</TooltipTrigger>
								<TooltipContent>
									<ArrowUpRight className="w-4 h-4 mr-2 inline-block" />
									GitHub
								</TooltipContent>
							</Tooltip>
						))}
					</div>
					<Button
						variant="outline"
						size="jumbo"
						onClick={() => setPage(page + 1)}
						className="mt-10"
					>
						Load more
					</Button>
				</div>
			</main>
			<footer className="flex flex-col justify-center items-center p-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-background/70 mt-32">
				<p className="text-sm text-gray-400 dark:text-gray-600">
					© {new Date().getFullYear()} cstef.dev - All rights reserved
				</p>
			</footer>
		</>
	);
}

function Bold({ children }: { children: React.ReactNode }) {
	return (
		<motion.p
			whileHover={{ y: -3 }}
			transition={{ type: "spring", stiffness: 400, damping: 10 }}
			className="font-bold cursor-pointer"
		>
			{children}
		</motion.p>
	);
}
