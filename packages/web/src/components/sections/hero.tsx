import { Macintosh, Terminal } from "@/components/composed/terminal";
import { Button } from "@/components/ui/button";
import Twemoji from "@/components/ui/twemoji";
import { motion } from "framer-motion";
import { Mail, TerminalIcon } from "lucide-react";
import { Bold } from "../ui/bold";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "../ui/context-menu";
import { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";

export default function Hero() {
	const [terminalOpen, setTerminalOpen] = useState(false);
	return (
		<div className="w-full h-full flex lg:block flex-col items-center">
			<div className="float-left">
				<div className="text-7xl sm:text-8xl font-bold mb-10 justify-center md:justify-start flex flex-wrap gap-4">
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
							Switzerland <Twemoji emoji="🇨🇭" className="sm:w-10 sm:h-10 w-8 h-8" />
						</Bold>
					</div>
				</p>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						delay: 2.5,
					}}
				>
					<Button
						variant="outline"
						size="jumbo"
						className="w-full mt-8"
						onClick={() => {
							const el = document.getElementById("contact");
							if (el) {
								el.scrollIntoView({ behavior: "smooth" });
							}
						}}
					>
						<Mail className="w-5 h-5 mr-3 inline-block" />
						Contact me
					</Button>
				</motion.div>
			</div>
			<ContextMenu>
				<ContextMenuTrigger asChild>
					<div className="lg:float-right flex items-center justify-center lg:block">
						<Macintosh />
					</div>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem onClick={() => setTerminalOpen(true)}>
						<TerminalIcon className="w-4 h-4 mr-2 inline-block" />
						Hack into this machine
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
			<Dialog open={terminalOpen} onOpenChange={(e) => setTerminalOpen(e)}>
				<DialogContent className="max-w-3xl h-[35rem]">
					<Terminal onExit={() => setTerminalOpen(false)} />
				</DialogContent>
			</Dialog>
		</div>
	);
}
