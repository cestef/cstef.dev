import { useEffect, useState } from "react";
import { KONAMI } from "./constants";

export const useKonami = (callback: () => void) => {
	const [keys, setKeys] = useState<string[]>([]);
	const [konami, setKonami] = useState<boolean>(false);

	// After 10 seconds, reset the keys array
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setKeys([]);
		}, 10000);

		return () => clearTimeout(timeoutId);
	}, [keys]);

	// If the keys array matches the konami code, set konami to true
	useEffect(() => {
		// console.log(keys.join(""));
		if (keys.join("") === KONAMI) {
			setKonami(true);
			callback();
		}
	}, [keys, callback]);

	// Add the pressed key to the keys array
	const handleKeyDown = (event: KeyboardEvent) => {
		setKeys((keys) => [...keys, event.keyCode.toString()]);
	};

	// Add the event listener
	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return konami;
};
