import { Editor, Terminal, type Visitor } from "@/components/composed/editor";
import { Button } from "@/components/ui/button";
import Twemoji from "@/components/ui/twemoji";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useState } from "react";
import { Bold } from "../ui/bold";

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
							Switzerland{" "}
							<Twemoji emoji="🇨🇭" className="sm:w-10 sm:h-10 w-8 h-8" />
						</Bold>
					</div>
				</p>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						delay: 2.25,
					}}
					className="lg:mb-0 mb-8"
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

			<div className="lg:float-right flex items-center justify-center lg:block">
				<Editor
					openConsole={(person: Visitor) => {
						if (!person.isSmart) {
							return "You are not smart enough to open the console.";
						}
						setTerminalOpen(true);
					}}
				/>
			</div>

			<Dialog open={terminalOpen} onOpenChange={(e) => setTerminalOpen(e)}>
				<DialogContent className="max-w-7xl h-[55rem]">
					<Terminal onExit={() => setTerminalOpen(false)} />
				</DialogContent>
			</Dialog>
		</div>
	);
}
