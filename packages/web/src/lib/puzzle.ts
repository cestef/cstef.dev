import { Chess } from "chess.js";
import { useEffect, useState } from "react";

export interface Puzzle {
	fen: string;
	moves: string[];
	makeFirstMove: boolean;
	turn?: "w" | "b";
}

export const usePuzzle = () => {
	const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
	useEffect(() => {
		fetch("https://lichess.org/api/puzzle/daily")
			.then((res) => res.json())
			.then((data) => {
				const pgn = data.game.pgn;
				const chess = new Chess();
				chess.loadPgn(pgn);
				const fen = chess.fen();

				const moves = data.puzzle.solution.map((move: string) => {
					const from = move.substring(0, 2);
					const to = move.substring(2, 4);
					return chess.move({ from, to, promotion: "q" }).san;
				});
				setPuzzle({
					fen,
					moves,
					makeFirstMove: false,
					turn: chess.turn() === "w" ? "b" : "w",
				});
			});
	}, []);

	return puzzle;
};
