import { useEffect, useState } from "react";
import AboutMe from "./components/sections/about";
import Header from "./components/sections/header";
import Hero from "./components/sections/hero";
import Repositories from "./components/sections/repositories";
import Socials from "./components/sections/socials";
import { Separator } from "./components/ui/separator";
import { cn } from "./lib/utils";
import Contact from "./components/sections/contact";
import { useKonami } from "./lib/konami";
import { Loader } from "./components/ui/loader";

export default function App() {
	const [copied, setCopied] = useState(false);
	const [open, setOpen] = useState<string | false>(false);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, []);

	useKonami(() => {
		window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
	});

	if (!loaded) return <Loader />;

	return (
		<>
			<Header />
			<main
				className={cn(
					"container mx-2 xl:mx-auto px-6 flex flex-col justify-between items-center"
				)}
			>
				<Hero />
				<Socials open={open} setOpen={setOpen} copied={copied} setCopied={setCopied} />
				<Repositories />
				<AboutMe />
				<Separator className="my-16" />
				<Contact open={open} setOpen={setOpen} copied={copied} setCopied={setCopied} />
			</main>
			<footer className="flex flex-col justify-center items-center p-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-background/70 mt-32">
				<p className="text-sm text-gray-400 dark:text-gray-600">
					© {new Date().getFullYear()} cstef.dev - All rights reserved
				</p>
			</footer>
		</>
	);
}
