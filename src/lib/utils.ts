import { clsx, type ClassValue } from "clsx";
import { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface UseLocalStorageProps<T = unknown> {
	key: string;
	defaultValue?: T;
}

export function useLocalStorage<T = unknown>({ key, defaultValue }: UseLocalStorageProps<T>) {
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
		[key]
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

export const shallowMerge = <T extends Record<string, unknown>>(a: T, b: Partial<T>): T => {
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

export const shallowEqual = <T extends Record<string, unknown>>(a: T, b: T): boolean => {
	return Object.entries(a).every(([key, value]) => {
		if (typeof value === "object" && value !== null) {
			return shallowEqual(value as T, b[key] as T);
		}

		return value === b[key];
	});
};

export const shallowDiff = <T extends Record<string, unknown>>(a: T, b: T): Partial<T> => {
	return Object.entries(a).reduce((acc, [key, value]) => {
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
	}, {} as Partial<T>);
};
