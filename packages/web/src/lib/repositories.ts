import { useCallback, useEffect, useState } from "react";

export interface Repository {
	name: string;
	url: string;
	description: string;
	stars: number;
	lastUpdate: string;
	forked: boolean;
	language: string;
}
export const useRepositories = (user: string) => {
	const [repositories, setRepositories] = useState<Repository[]>([]);
	const [page, setPage] = useState(1);
	const [isMore, setIsMore] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch(
			`https://api.github.com/users/${user}/repos?sort=pushed&direction=desc&per_page=8&page=${page}`,
		)
			.then((res) => res.json())
			.then((data) => {
				setIsLoading(false);
				if (data.length < 8) {
					setIsMore(false);
					return;
				}
				if (data.message) {
					setRepositories([
						{
							name: "Error",
							url: "",
							description: data.message,
							stars: 0,
							lastUpdate: "",
							forked: false,
							language: "",
						},
					]);
					setIsMore(false);
					return;
				}
				setRepositories((e) =>
					e.concat(
						data
							.map(
								(repo: {
									name: string;
									html_url: string;
									description: string;
									stargazers_count: number;
									updated_at: string;
									fork: boolean;
									language: string;
								}) => ({
									name: repo.name,
									url: repo.html_url,
									description: repo.description,
									stars: repo.stargazers_count,
									lastUpdate: repo.updated_at,
									forked: repo.fork,
									language: repo.language,
								}),
							)
							.filter(
								(repo: Repository) => !e.find((r) => r.name === repo.name),
							),
					),
				);
			})
			.catch(() => {
				setIsLoading(false);
				return [];
			});
	}, [user, page]);

	const loadMore = useCallback(() => {
		setPage((e) => e + 1);
	}, []);

	return { repositories, page, loadMore, isMore, loading: isLoading };
};
