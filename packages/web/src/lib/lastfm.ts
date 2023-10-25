import { useState, useEffect } from "react";

const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY;

export const useLastFM = (
	username: string,
	interval: number = 5000,
	size: string = "large",
	current: boolean = false
) => {
	const [lastFMData, setLastFMData] = useState<{
		recenttracks: {
			track: {
				"@attr": {
					nowplaying: string;
				};
				artist: {
					"#text": string;
				};
				name: string;
				image: {
					size: string;
					"#text": string;
				}[];
				url: string;
			}[];
		};
	} | null>(null);

	useEffect(() => {
		const fetchLastFMData = async () => {
			const response = await fetch(
				`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${LASTFM_API_KEY}&format=json`
			);
			const data = await response.json();
			setLastFMData(data);
		};

		fetchLastFMData();
		const intervalId = setInterval(fetchLastFMData, interval);

		return () => clearInterval(intervalId);
	}, [username, interval]);

	if (!lastFMData) return null;

	const { recenttracks } = lastFMData;
	const { track } = recenttracks;

	if (track[0]["@attr"] && track[0]["@attr"].nowplaying !== "true" && current) return null;

	const { artist, name, image, url } = track[0];

	return {
		artist: artist["#text"],
		name,
		image: image.find((img: { size: string }) => img.size === size)?.["#text"],
		url,
	};
};
