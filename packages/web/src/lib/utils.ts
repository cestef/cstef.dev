import { type ClassValue, clsx } from "clsx";
import { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";
import type { Dir, File } from "./constants";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface UseLocalStorageProps<T = unknown> {
	key: string;
	defaultValue?: T;
}

export function useLocalStorage<T = unknown>({
	key,
	defaultValue,
}: UseLocalStorageProps<T>) {
	const [value, setValue] = useState<T>(() => {
		const storedValue = localStorage.getItem(key);

		if (storedValue) {
			return JSON.parse(storedValue);
		}

		return defaultValue;
	});

	const setLocalStorageValue = useCallback(
		(newValue: T) => {
			localStorage.setItem(key, JSON.stringify(newValue));
			setValue(newValue);
		},
		[key],
	);

	return [value, setLocalStorageValue] as const;
}

const COLORS = [
	"#0081a7",
	"#00afb9",
	"#f07167",
	"#2a9d8f",
	"#e9c46a",
	"#f4a261",
	"#c8b6ff",
	"#e7c6ff",
	"#bbd0ff",
	"#e63946",
	"#6a994e",
	"#a7c957",
];

export const getRandomHexColor = () => {
	return COLORS[Math.floor(Math.random() * COLORS.length)];
};

export const shallowMerge = <T extends Record<string, unknown>>(
	a: T,
	b: Partial<T>,
): T => {
	return Object.entries(b).reduce((acc, [key, value]) => {
		if (typeof value === "object" && value !== null) {
			return {
				...acc,
				[key]: shallowMerge((acc[key] ?? {}) as T, value as Partial<T>),
			};
		}

		return {
			...acc,
			[key]: value,
		};
	}, a);
};

export const shallowEqual = <T extends Record<string, unknown>>(
	a: T,
	b: T,
): boolean => {
	return Object.entries(a).every(([key, value]) => {
		if (typeof value === "object" && value !== null) {
			return shallowEqual(value as T, b[key] as T);
		}

		return value === b[key];
	});
};

export const shallowDiff = <T extends Record<string, unknown>>(
	a: T,
	b: T,
): Partial<T> => {
	return Object.entries(a).reduce(
		(acc, [key, value]) => {
			if (typeof value === "object" && value !== null) {
				return {
					...acc,
					[key]: shallowDiff(value as T, b[key] as T),
				};
			}

			return {
				...acc,
				[key]: value === b[key] ? undefined : value,
			};
		},
		{} as Partial<T>,
	);
};

const languagesToColors = {
	typescript: "#2b7489",
	javascript: "#f1e05a",
	python: "#3572a5",
	rust: "#dea584",
	go: "#00ADD8",
	java: "#b07219",
	kotlin: "#A97BFF",
	ruby: "#701516",
	php: "#4F5D95",
	"c#": "#178600",
	"c++": "#f34b7d",
	c: "#555555",
	"objective-c": "#438eff",
	"objective-c++": "#6866fb",
	shell: "#89e051",
	swift: "#F05137",
	mdx: "#f9ac00",
};

export function getLanguageColor(language: string) {
	return (
		languagesToColors[
			(language ?? "").toLowerCase() as keyof typeof languagesToColors
		] ?? "#00000000"
	);
}
export const truncate = (str: string, n: number) =>
	str.length > n ? `${str.slice(0, n - 1)}...` : str;
export const getAtPath = (path: string, dir: Dir): Dir | File | undefined => {
	path = path.trim();
	if (path === "/") return dir;
	let [first, ...rest] = path.split("/");
	if (first === "") {
		first = rest[0];
		rest = rest.slice(1);
	}
	const found = dir.children.find((e) => e.name === first);
	if (!found) return undefined;
	if (rest.length === 0) return found;
	if (found.type !== "dir") return undefined;
	return getAtPath(rest.join("/"), found);
};

export const getJSON = async <T>(path: string): Promise<T> => {
	const res = await fetch(import.meta.env.VITE_API_URL + path, {
		credentials: "include",
	});
	return await res.json();
};
