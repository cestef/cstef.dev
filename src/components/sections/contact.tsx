import { EMAIL } from "@/lib/constants";
import { motion } from "framer-motion";
import { Mail, Copy } from "lucide-react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "../ui/dialog";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { useState } from "react";
import { usePuzzle } from "@/lib/puzzle";
import { ChessPuzzle } from "@react-chess-tools/react-chess-puzzle";
import { Bold } from "../ui/bold";
import Twemoji from "../ui/twemoji";

export default function Contact({
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
	const [hoveringEmail, setHoveringEmail] = useState(false);
	const puzzle = usePuzzle();
	return (
		<div className="w-full flex flex-row justify-center items-center gap-8">
			<motion.h2
				whileInView={{ scale: [0.2, 1] }}
				viewport={{ once: true }}
				transition={{ type: "spring", stiffness: 300, damping: 20 }}
				className="text-2xl sm:text-4xl font-bold"
			>
				Get in touch !
			</motion.h2>

			<Dialog open={open === "contact"} onOpenChange={(e) => setOpen(e ? "contact" : false)}>
				<DialogTrigger>
					<Button variant="outline" size="jumbo">
						<Mail className="w-5 h-5 mr-3 inline-block" />
						Contact me
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="text-2xl">Are you a robot ?</DialogTitle>
						<DialogDescription className="text-base">
							Please solve this puzzle to prove you're not a robot.
						</DialogDescription>
					</DialogHeader>
					<ChessPuzzle.Root
						puzzle={
							puzzle ?? {
								fen: "4kb1r/p2r1ppp/4qn2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 1",
								moves: ["Bxd7+", "Nxd7", "Qb8+", "Nxb8", "Rd8#"],
								makeFirstMove: false,
							}
						}
						onFail={() => setOpen(false)}
						onSolve={() => setOpen("email")}
					>
						<ChessPuzzle.Board arePiecesDraggable={false} />
					</ChessPuzzle.Root>
					<p className="text-lg text-center mt-2">
						{puzzle?.turn === "w" ? "White to move" : "Black to move"}
					</p>
				</DialogContent>
			</Dialog>
			<Dialog open={open === "email"} onOpenChange={(e) => setOpen(e ? "email" : false)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="text-2xl">
							Congratulations <Twemoji emoji="🎉" className="ml-2 w-7 h-7" />
						</DialogTitle>
					</DialogHeader>
					<div className="text-lg flex flex-col items-center gap-2 justify-center">
						<p>Here's my email address:</p>
						<Tooltip delayDuration={0} open={hoveringEmail}>
							<TooltipTrigger>
								<p
									onPointerEnter={() => setHoveringEmail(true)}
									onPointerLeave={() => setHoveringEmail(false)}
									onClick={() => {
										navigator.clipboard.writeText(EMAIL);
										setCopied(true);
										setTimeout(() => setCopied(false), 5000);
									}}
									className="text-2xl"
								>
									<Bold>{EMAIL}</Bold>
								</p>
							</TooltipTrigger>
							<TooltipContent side="right" className="ml-2 mb-1">
								<Copy className="w-4 h-4 mr-2 inline-block" />
								{copied ? "Copied!" : "Copy"}
							</TooltipContent>
						</Tooltip>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
