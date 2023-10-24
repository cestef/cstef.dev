import { SOCIALS } from "@/lib/constants";
import { useLastFM } from "@/lib/lastfm";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Music } from "lucide-react";
import { FaSpotify } from "react-icons/fa";
import { P, match } from "ts-pattern";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function Socials({
	open,
	setOpen,
	copied,
	setCopied,
}: {
	open: string | false;
	setOpen: (open: string | false) => void;
	copied: boolean;
	setCopied: (copied: boolean) => void;
}) {
	const lastFM = useLastFM("cestef");
	return (
		<div className="lg:mt-32 flex flex-col justify-center items-center">
			<motion.h2
				animate={{ scale: [0.2, 1] }}
				transition={{ type: "spring", stiffness: 300, damping: 20 }}
				className="text-3xl sm:text-4xl font-bold mb-10"
			>
				Find me on
			</motion.h2>
			<div className="flex flex-row justify-center items-center gap-4 mx-4">
				{SOCIALS.map((social, index) =>
					match(social.variant)
						.with(P.union("link", "copy"), () => (
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
									{match(social.variant)
										.with("copy", () => (
											<>
												{copied ? (
													<>
														<Check className="w-4 h-4 mr-2 inline-block" />
														Copied!
													</>
												) : (
													<>
														<Copy className="w-4 h-4 mr-2 inline-block" />{" "}
														Copy
													</>
												)}
											</>
										))
										.with("link", () => (
											<>
												<ArrowUpRight className="w-4 h-4 mr-2 inline-block" />
												{social.name}
											</>
										))
										.with("spotify", () => <></>)
										.exhaustive()}
								</TooltipContent>
							</Tooltip>
						))
						.with("spotify", () => (
							<HoverCard key={index} openDelay={0} closeDelay={0}>
								<HoverCardTrigger>
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
								</HoverCardTrigger>
								<HoverCardContent side="top" className="w-96 mb-2 px-5 py-4">
									{lastFM ? (
										<a
											href={lastFM?.url}
											target="_blank"
											rel="noopener noreferrer"
										>
											<div className="flex flex-row justify-between items-center gap-2 w-full">
												<FaSpotify className="w-8 h-8 mr-2 inline-block" />
												<p className="truncate text-lg">
													<b>{lastFM?.name}</b> - {lastFM?.artist}
												</p>
												<img
													src={lastFM?.image}
													className="rounded-sm shadow-sm w-16 h-16 ml-2"
												/>
											</div>
										</a>
									) : (
										<a
											href="https://last.fm/user/cestef"
											target="_blank"
											rel="noopener noreferrer"
										>
											<div className="flex flex-row justify-between items-center gap-2 w-full">
												<FaSpotify className="w-8 h-8 mr-2 inline-block" />
												<p className="truncate text-lg">
													<b>Not listening</b>
												</p>
												<Music className="w-16 h-16 ml-2 border-2 p-4 rounded-sm shadow-sm text-muted-foreground" />
											</div>
										</a>
									)}
								</HoverCardContent>
							</HoverCard>
						))
						.exhaustive()
				)}
			</div>
		</div>
	);
}
