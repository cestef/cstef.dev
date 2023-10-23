import { cn } from "@/lib/utils";
import { Html, OrbitControls, PerspectiveCamera, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Model } from "./Computer";
import { Loader2 } from "lucide-react";

interface TerminalState {
	input: string;
	output: string[];
	history: string[];
	historyIndex: number;
}

const useTerminalState = (): {
	set: (key: keyof TerminalState, value: unknown) => void;
	state: TerminalState;
} => {
	const [state, setState] = useState<TerminalState>({
		input: "",
		output: [],
		history: [],
		historyIndex: -1,
	});

	const set = useCallback(
		(key: keyof TerminalState, value: unknown) => {
			setState((state) => ({ ...state, [key]: value }));
		},
		[setState]
	);

	return { state, set };
};
export function Terminal({ className }: { className?: string }) {
	const { state, set } = useTerminalState();

	const commands = {
		clear: () => {
			set("output", []);
		},
		help: () => {
			set("output", [
				...state.output,
				"Available commands:",
				"- clear: clear the terminal",
				"- help: show this help message",
				"- echo: display a message",
			]);
		},
		echo: (message: string) => {
			set("output", [...state.output, message]);
		},
	};

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			set("input", e.target.value);
		},
		[set]
	);

	const handleInputKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.ctrlKey) {
				if (e.key === "l") {
					set("output", []);
				} else if (e.key === "u") {
					set("input", "");
				}
			} else if (e.key === "Enter") {
				set("history", [...state.history, state.input]);
				set("historyIndex", state.history.length);
				const [command, ...args] = state.input.split(" ");
				const foundCommand =
					commands[command as keyof typeof commands] ??
					(() => set("output", [...state.output, `Command not found: ${command}`]));
				foundCommand?.(args.join(" "));
				set("input", "");
			} else if (e.key === "ArrowUp") {
				if (state.historyIndex > 0) {
					set("historyIndex", state.historyIndex - 1);
					set("input", state.history[state.historyIndex - 1]);
				}
			} else if (e.key === "ArrowDown") {
				if (state.historyIndex < state.history.length) {
					set("historyIndex", state.historyIndex + 1);
					set("input", state.history[state.historyIndex + 1]);
				}
			}
		},
		[state, set]
	);

	useEffect(() => {
		const terminal = document.getElementById("terminal");
		if (terminal) {
			terminal.scrollTop = terminal.scrollHeight;
		}
	}, [state.output]);

	return (
		<div
			className={cn(
				"h-full w-full overflow-y-auto bg-accent rounded-md p-6 font-mono",
				className
			)}
			onClick={() => {
				const input = document.querySelector("#terminal input");
				if (input) {
					(input as HTMLInputElement).focus();
				}
			}}
		>
			<div className="flex justify-center items-center text-gray-400">guest@cstef.dev</div>
			<div id="terminal">
				{state.output.map((line, index) => (
					<div key={index} className="terminal__line">
						{line}
					</div>
				))}
				<div className="flex flex-row gap-3">
					<span>$</span>
					<input
						className="bg-transparent w-full focus:outline-none"
						type="text"
						value={state.input}
						onChange={handleInputChange}
						onKeyDown={handleInputKeyDown}
					/>
				</div>
			</div>
		</div>
	);
}

export default function MacbookTerminal() {
	return (
		<Canvas
			style={{
				height: "40vh",
				width: "30vw",
			}}
		>
			<Element />
		</Canvas>
	);
}

function Element() {
	return (
		<>
			<Suspense
				fallback={
					<Html>
						<Loader2 className="w-12 h-12 animate-spin" />
					</Html>
				}
			>
				<Stage environment="city" intensity={0.6}>
					<Model />
				</Stage>
			</Suspense>
			<OrbitControls
				enablePan={false}
				enableZoom={false}
				minPolarAngle={Math.PI / 2.2}
				maxPolarAngle={Math.PI / 2.2}
				autoRotate
			/>
			<PerspectiveCamera makeDefault position={[1, 1, 25]} fov={50} zoom={0.5} />
		</>
	);
}
