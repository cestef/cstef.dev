import LightSwitch from "./components/composed/light-switch";
import { ModeToggle } from "./components/composed/mode-toggle";
import Twemoji from "./components/ui/twemoji";

export default function App() {
	return (
		<>
			<header className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-background/70 z-10 mb-6">
				<h1 className="text-3xl font-bold">
					<Twemoji emoji="👨‍💻" className="mr-3 w-8 h-8" />
					cstef.dev
				</h1>
				<ModeToggle className="md:hidden" />
				<LightSwitch />
			</header>
			<main className="container mx-auto px-6">
				<div className="flex flex-row justify-between">
					<div className="flex flex-col">
						<h2 className="text-8xl font-bold mb-3">Hello, World !</h2>
					</div>
					<div className="flex flex-col">
						<h2 className="text-8xl font-bold mb-3"></h2>
					</div>
				</div>
			</main>
			<footer className=""></footer>
		</>
	);
}
