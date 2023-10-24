import { motion } from "framer-motion";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Twemoji from "@/components/ui/twemoji";
import Terminal from "@/components/composed/terminal";
import { Bold } from "../ui/bold";

export default function Hero({ setDragging }: { setDragging: (dragging: boolean) => void }) {
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
				<Button variant="outline" size="jumbo" className="w-full mt-6">
					<FileDown className="w-5 h-5 mr-3 inline-block" />
					Download Resume
				</Button>
			</div>
			<div className="lg:float-right flex items-center justify-center lg:block">
				<Terminal setDragging={setDragging} />
			</div>
		</div>
	);
}
