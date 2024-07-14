import LightSwitch from "../composed/light-switch";
import { ModeToggle } from "../composed/mode-toggle";
import Twemoji from "../ui/twemoji";

export default function Header() {
	return (
		<header className="flex justify-between items-center py-4 sm:py-6 px-6 sm:px-8 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-background/70 z-10 lg:mb-32 mb-16">
			<a href="/">
				<h1 className="text-2xl sm:text-3xl font-bold">
					<Twemoji emoji="👨‍💻" className="mr-3 w-8 h-8" />
					cstef.dev
				</h1>
			</a>
			<ModeToggle className="md:hidden" />
			<LightSwitch />
		</header>
	);
}
