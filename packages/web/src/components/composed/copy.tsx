import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import React from "react";
import {
	AnimatePresence,
	motion,
	useMotionValue,
	useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";

type CopyContentProps = {
	children: React.ReactNode;
	content: string;
	className?: string;
};

export const CopyContent = ({
	children,
	className,
	content,
}: CopyContentProps) => {
	const [isOpen, setOpen] = React.useState(false);
	const [copied, setCopied] = React.useState(false);
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
					onClick={() => {
						navigator.clipboard.writeText(content);
						setCopied(true);
						setTimeout(() => setCopied(false), 5000);
					}}
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
								className="shadow-xl rounded-xl border"
								style={{
									x: translateX,
								}}
							>
								{copied ? (
									<div className="flex items-center p-4 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 rounded-xl">
										<CheckIcon className="w-6 h-6 mr-2" />
										Copied!
									</div>
								) : (
									<div className="flex items-center p-4 bg-popover text-foreground rounded-xl">
										<CopyIcon className="w-6 h-6 mr-2" />
										Copy
									</div>
								)}
							</motion.div>
						)}
					</AnimatePresence>
				</HoverCardPrimitive.Content>
			</HoverCardPrimitive.Root>
		</>
	);
};
