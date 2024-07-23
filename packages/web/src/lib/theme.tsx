import { createContext, useCallback, useContext, useEffect } from "react";
import { useLocalStorage } from "./utils";

interface ColorSchemeContextProps {
	colorScheme: "dark" | "light" | "system";
	setColorScheme: (colorScheme: "dark" | "light" | "system") => void;
}

export const ColorSchemeContext = createContext<ColorSchemeContextProps>({
	colorScheme: "light",
	setColorScheme: () => {},
});

const resolveColorScheme = (
	colorScheme: "dark" | "light" | "system",
): "dark" | "light" =>
	colorScheme === "system"
		? window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light"
		: colorScheme;

export function ColorSchemeProvider({
	children,
}: { children: React.ReactNode }) {
	const [colorScheme, setColorScheme] = useLocalStorage<
		"dark" | "light" | "system"
	>({
		key: "colorScheme",
		defaultValue: "system",
	});

	useEffect(() => {
		const root = window.document.documentElement;
		const resolvedColorScheme =
			colorScheme === "system"
				? window.matchMedia("(prefers-color-scheme: dark)").matches
					? "dark"
					: "light"
				: colorScheme;
		root.classList.remove(resolvedColorScheme === "light" ? "dark" : "light");
		root.classList.add(resolvedColorScheme);
	}, [colorScheme]);

	return (
		<ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>
			{children}
		</ColorSchemeContext.Provider>
	);
}

export function useColorScheme() {
	const { colorScheme, setColorScheme } = useContext(ColorSchemeContext);
	const toggleColorScheme = useCallback(() => {
		setColorScheme(
			resolveColorScheme(colorScheme) === "light" ? "dark" : "light",
		);
	}, [colorScheme]);
	return {
		colorScheme,
		setColorScheme,
		toggleColorScheme,
		resolvedColorScheme: resolveColorScheme(colorScheme),
	};
}
