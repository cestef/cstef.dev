import { useState, useEffect } from "react";

export const useKonami = (callback: () => void) => {
	const [keys, setKeys] = useState<string[]>([]);
	const [konami, setKonami] = useState<boolean>(false);

	// After 10 seconds, reset the keys array
	useEffect(() => {
		console.log("setting timeout");
		const timeoutId = setTimeout(() => {
			console.log("resetting keys");
			setKeys([]);
		}, 10000);

		return () => clearTimeout(timeoutId);
	}, [keys]);

	// If the keys array matches the konami code, set konami to true
	useEffect(() => {
		console.log(keys.join(""));
		if (keys.join("") === "38384040373937396665") {
			setKonami(true);
			callback();
		}
	}, [keys]);

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
