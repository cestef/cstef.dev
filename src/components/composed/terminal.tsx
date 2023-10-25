import { Dir, FILE_TREE, File } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Html, PerspectiveCamera, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Loader2 } from "lucide-react";
import path from "path";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Model } from "./Computer";

interface TerminalState {
	input: string;
	output: Output[];
	history: string[];
	historyIndex: number;
	cwd: string;
}

class Output {
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
						Last login: <span className="text-green-500">Sun Sep 12 2021 12:00:00</span>{" "}
						on ttys000
					</>
				)
			),
		],
		history: [],
		historyIndex: -1,
		cwd: "/",
	});

	const set = useCallback(
		(key: keyof TerminalState, value: unknown) => {
			setState((state) => ({ ...state, [key]: value }));
		},
		[setState]
	);

	return { state, set };
};

enum ControlCodes {
	RESET,
}

interface Command {
	name: string;
	description: string;
	run: (args: string[]) => ControlCodes | Output[];
}

export function Terminal({ className }: { className?: string }) {
	const { state, set } = useTerminalState();

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
				if (command === "help") {
					set(
						"output",
						[
							...state.output,
							new Output(`> ${state.input}`),
							new Output("Available commands:", "font-bold"),
						].concat(
							[
								new Output(
									(
										<>
											<span className="text-green-400">help</span> - Display
											this message
										</>
									)
								),
							].concat(
								commands.map(
									(command) =>
										new Output(
											(
												<>
													<span className="text-green-400">
														{command.name}
													</span>{" "}
													- {command.description}
												</>
											)
										)
								)
							)
						)
					);
					set("input", "");
					return;
				}
				const foundCommand = commands.find((e) => e.name === command);
				if (!foundCommand) {
					set("output", [
						...state.output,
						new Output(`> ${state.input}`),
						new Output(`Command not found: ${command}`, "text-destructive"),
					]);
					set("input", "");
					return;
				}
				const res = foundCommand.run(args);
				if (res === ControlCodes.RESET) set("output", []);
				else
					set(
						"output",
						[...state.output, new Output(`> ${state.input}`)].concat(res ?? [])
					);
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

	const getAtPath = (path: string, dir: Dir): Dir | File | undefined => {
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

	const commands: Command[] = [
		{
			name: "clear",
			description: "Clear the terminal",
			run: () => ControlCodes.RESET,
		},
		{
			name: "echo",
			description: "Display a message",
			run: (args) => [new Output(args.join(" "))],
		},
		{
			name: "ls",
			description: "List files and directories",
			run: (args) => {
				const resolvedPath = path.resolve(state.cwd, args[0] ?? ".");
				console.log(resolvedPath);
				const dir = getAtPath(resolvedPath, FILE_TREE);
				if (!dir) {
					return [
						new Output(
							`ls: cannot access '${args[0]}': No such file or directory`,
							"text-destructive"
						),
					];
				}
				if (dir.type !== "dir") {
					return [
						new Output(
							`ls: cannot access '${args[0]}': Not a directory`,
							"text-destructive"
						),
					];
				}
				console.log(dir.children);
				return dir.children.map((file) => new Output(file.name));
			},
		},
		{
			name: "cd",
			description: "Change directory",
			run: (args) => {
				const resolvedPath = path.resolve(state.cwd, args[0] ?? ".");
				console.log(resolvedPath);
				const dir = getAtPath(resolvedPath, FILE_TREE);
				if (!dir) {
					return [
						new Output(`cd: no such file or directory: ${args[0]}`, "text-destructive"),
					];
				}
				if (dir.type !== "dir") {
					return [new Output(`cd: not a directory: ${args[0]}`, "text-destructive")];
				}
				set("cwd", resolvedPath);
				return [];
			},
		},
		{
			name: "cat",
			description: "Read a file",
			run: (args) => {
				const resolvedPath = path.resolve(state.cwd, args[0] ?? ".");
				console.log(resolvedPath);
				const file = getAtPath(resolvedPath, FILE_TREE);
				if (!file) {
					return [
						new Output(
							`cat: no such file or directory: ${args[0]}`,
							"text-destructive"
						),
					];
				}
				if (file.type !== "file") {
					return [new Output(`cat: not a file: ${args[0]}`, "text-destructive")];
				}
				return [new Output(file.content)];
			},
		},
		{
			name: "pwd",
			description: "Print working directory",
			run: () => [new Output(state.cwd)],
		},
		{
			name: "whoami",
			description: "Print current user",
			run: () => [new Output("root")],
		},
	];
	useEffect(() => {
		const terminal = document.getElementById("terminal");
		if (terminal) {
			terminal.scrollTop = terminal.scrollHeight;
		}
	}, [state.output]);

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
				root@cstef.dev
			</div>
			<div id="terminal" className="p-4">
				{state.output.map((line, index) => (
					<div key={index} className="">
						{line.toElement()}
					</div>
				))}
				<div className="flex flex-row gap-2">
					<span className="text-muted-foreground">{formatCWD(state.cwd)}</span>
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
