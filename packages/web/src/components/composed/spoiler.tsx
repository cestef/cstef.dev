import { useState } from "react";
import { cn } from "@/lib/utils";

// Rewrite using tailwindcss
export default function Spoiler({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const [hidden, setHidden] = useState(true);
	return (
		<span
			onClick={() => {
				setHidden(false);
			}}
			className={cn(
				"p-px rounded cursor-pointer transition-all duration-200 ease-in-out",
				hidden ? "bg-gray-200 dark:bg-gray-800" : "bg-gray-300 dark:bg-gray-600"
			)}
		>
			<span
				className={cn(
					hidden ? "text-transparent select-none" : "text-gray-900 dark:text-gray-100",
					className
				)}
			>
				{children}
			</span>
		</span>
	);
}
