import { SOCIALS } from "@/lib/constants";
import { motion } from "framer-motion";
import { Copy, ArrowUpRight } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

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
	);
}
