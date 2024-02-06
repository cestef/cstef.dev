import { ControlCodes, useCommands } from "@/lib/commands";
import { cn } from "@/lib/utils";
import { Html, PerspectiveCamera, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Loader2 } from "lucide-react";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Model } from "./Computer";
import { useUser } from "@/lib/user";

export interface TerminalState {
	input: string;
	output: Output[];
	history: string[];
	historyIndex: number;
	cwd: string;
	running: boolean;
}

export class Output {
	constructor(public content: React.ReactNode, public className: string = "") {}
	toElement() {
		return <p className={cn(this.className)}>{this.content}</p>;
	}
}

const useTerminalState = (): {
	set: (key: keyof TerminalState, value: unknown) => void;
	state: TerminalState;
} => {
	const [state, setState] = useState<TerminalState>({
		input: "",
		output: [
			new Output(
				(
					<>
						Last login:{" "}
						<span className="text-green-500">
							{new Date(Math.floor(Math.random() * Date.now())).toUTCString()}
						</span>{" "}
						on ttys
						{Math.floor(Math.random() * 10)}
					</>
				)
			),
			new Output(
				(
					<>
						Type <span className="font-bold">help</span> to see available commands
					</>
				)
			),
		],
		history: [],
		historyIndex: -1,
		cwd: "/",
		running: false,
	});

	const set = useCallback(
		(key: keyof TerminalState, value: unknown) => {
			setState((state) => ({ ...state, [key]: value }));
		},
		[setState]
	);

	return { state, set };
};

export function Terminal({ className, onExit }: { className?: string; onExit: () => void }) {
	const { state, set } = useTerminalState();
	const commands = useCommands({ state, set });
	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			set("input", e.target.value);
		},
		[set]
	);

	const handleInputKeyDown = useCallback(
		async (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.ctrlKey) {
				if (e.key === "l") {
					set("output", []);
				} else if (e.key === "u") {
					set("input", "");
				}
			} else if (e.key === "Enter") {
				set("input", "");
				set("history", [...state.history, state.input]);
				set("historyIndex", state.history.length + 1);
				let output = state.output;
				const addText = (text: Output) => {
					output = [...output, text];
					set("output", output);
				};
				addText(new Output(`> ${state.input}`));
				const [command, ...args] = state.input.split(" ");

				const foundCommand = commands.find((e) => e.name === command);
				if (!foundCommand) {
					set("output", [
						...state.output,
						new Output(`Command not found: ${command}`, "text-destructive"),
					]);
					set("input", "");
					return;
				}
				set("running", true);
				const res = await foundCommand.run(args);
				set("running", false);
				if (res === ControlCodes.RESET) set("output", []);
				else if (res === ControlCodes.EXIT) {
					onExit();
				} else
					set(
						"output",
						output.concat(
							res.map((e) => {
								if (typeof e === "string") return new Output(e);
								return e;
							})
						)
					);
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

	useEffect(() => {
		const input = document.querySelector("#terminal input");
		if (input) {
			(input as HTMLInputElement).focus();
		}
	}, [state.running]);

	const { user } = useUser();

	return (
		<div
			className={cn("h-full w-full overflow-y-auto rounded-md font-mono", className)}
			onClick={() => {
				const input = document.querySelector("#terminal input");
				if (input) {
					(input as HTMLInputElement).focus();
				}
			}}
		>
			<div className="flex flex-col bg-background justify-center items-center text-gray-400 select-none sticky top-0">
				{user?.login ?? "guest"}@cstef.dev
			</div>
			<div id="terminal" className="p-4">
				{state.output.map((line, index) => (
					<div key={index} className="">
						{line.toElement()}
					</div>
				))}
				<div
					className={cn("flex flex-row gap-2", {
						hidden: state.running,
					})}
				>
					<span className="text-muted-foreground">{formatCWD(state.cwd)}</span>
					<span>$</span>
					<input
						className="bg-transparent w-full focus:outline-none"
						type="text"
						value={state.input}
						onChange={handleInputChange}
						onKeyDown={handleInputKeyDown}
						disabled={state.running}
					/>
				</div>
			</div>
		</div>
	);
}

export function Macintosh() {
	return (
		<div className="lg:!w-[30vw] lg:!h-[40svh] !w-[75vw] !h-[50svh]">
			<Canvas className="w-full h-full">
				<Element />
			</Canvas>
		</div>
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
			<PerspectiveCamera makeDefault position={[1, 1, 25]} fov={50} zoom={0.5} />
		</>
	);
}

const CWD_ALIASES = {
	"/home/cstef": "~",
};

const formatCWD = (cwd: string) => {
	return CWD_ALIASES[cwd as keyof typeof CWD_ALIASES] ?? cwd;
};
