import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useColorScheme } from "@/lib/theme";

export function ModeToggle({ className }: { className?: string }) {
	const { toggleColorScheme, setColorScheme } = useColorScheme();

	return (
		<ContextMenu>
			<ContextMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					onClick={toggleColorScheme}
					className={className}
				>
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem onClick={() => setColorScheme("light")}>Light</ContextMenuItem>
				<ContextMenuItem onClick={() => setColorScheme("dark")}>Dark</ContextMenuItem>
				<ContextMenuItem onClick={() => setColorScheme("system")}>System</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
