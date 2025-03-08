import { useLastFM } from "@/lib/lastfm";
import { cn } from "@/lib/utils";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import {
	AnimatePresence,
	motion,
	useMotionValue,
	useSpring,
} from "framer-motion";
import React from "react";
import Image from "../composed/image";
import { FaSpotify } from "react-icons/fa6";
import { Music } from "lucide-react";

type SpotifyProps = {
	children: React.ReactNode;
	url: string;
	className?: string;
};

export const Spotify = ({ children, className, url }: SpotifyProps) => {
	const lastFM = useLastFM("cestef", 30_000);
	const [isOpen, setOpen] = React.useState(false);
	const springConfig = { stiffness: 100, damping: 15 };
	const x = useMotionValue(0);

	const translateX = useSpring(x, springConfig);

	const handleMouseMove = (event: any) => {
		const targetRect = event.target.getBoundingClientRect();
		const eventOffsetX = event.clientX - targetRect.left;
		const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2; // Reduce the effect to make it subtle
		x.set(offsetFromCenter);
	};

	return (
		<>
			<HoverCardPrimitive.Root
				openDelay={50}
				closeDelay={100}
				onOpenChange={(open) => {
					setOpen(open);
				}}
			>
				<HoverCardPrimitive.Trigger
					onMouseMove={handleMouseMove}
					className={cn(className)}
					href={url}
				>
					{children}
				</HoverCardPrimitive.Trigger>

				<HoverCardPrimitive.Content
					className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
					side="top"
					align="center"
					sideOffset={10}
				>
					<AnimatePresence>
						{isOpen && (
							<motion.div
								initial={{ opacity: 0, y: 20, scale: 0.6 }}
								animate={{
									opacity: 1,
									y: 0,
									scale: 1,
									transition: {
										type: "spring",
										stiffness: 260,
										damping: 20,
									},
								}}
								exit={{ opacity: 0, y: 20, scale: 0.6 }}
								className="shadow-xl rounded-xl border px-4 py-2 bg-popover text-popover-foreground"
								style={{
									x: translateX,
								}}
							>
								{lastFM ? (
									<a
										href={lastFM?.url}
										target="_blank"
										rel="noopener noreferrer"
									>
										<div className="flex flex-row justify-between items-center gap-2 w-full">
											<FaSpotify className="w-8 h-8 mr-2 inline-block" />
											<p className="truncate text-lg w-48">
												<b>{lastFM?.name}</b> - {lastFM?.artist}
											</p>
											<Image
												src={lastFM?.image}
												alt="Last.fm album cover"
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
											<p className="truncate">
												<b>Not listening to anything</b>
											</p>
											<Music className="w-16 h-16 ml-2 border-2 p-4 rounded-sm shadow-sm text-muted-foreground" />
										</div>
									</a>
								)}
							</motion.div>
						)}
					</AnimatePresence>
				</HoverCardPrimitive.Content>
			</HoverCardPrimitive.Root>
		</>
	);
};
