import useSWR from "swr";
import { getJSON } from "./utils";

export interface User {
	id: number;
	login: string;
	avatarUrl: string;
	githubId: number;
	flags: {
		id: number;
		name: string;
		value: string;
		level: number;
	}[];
}

export const useUser = () => {
	const { data, error, isLoading, mutate } = useSWR<User & { error?: string }>(
		"/session",
		getJSON,
	);
	return {
		user: data?.error ? undefined : data,
		loading: isLoading,
		error: data?.error ?? error,
		mutate,
	};
};

export const getUser = () => getJSON<User>("/session");
