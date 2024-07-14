import { ControlCodes, useCommands } from "@/lib/commands";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUser } from "@/lib/user";
import { useColorScheme } from "@/lib/theme";
import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";
import { githubLightInit, githubDarkInit } from "@uiw/codemirror-theme-github";
import { Button } from "../ui/button";

export interface TerminalState {
	input: string;
	output: Output[];
	history: string[];
	historyIndex: number;
	cwd: string;
	running: boolean;
	completionIndex: number;
	completionOptions: string[];
}

export class Output {
	constructor(
		public content: React.ReactNode,
		public className = "",
	) {}
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
				<>
					Last login:{" "}
					<span className="text-green-500">
						{new Date(Math.floor(Math.random() * Date.now())).toUTCString()}
					</span>{" "}
					on ttys
					{Math.floor(Math.random() * 10)}
				</>,
			),
			new Output(
				<>
					Type <span className="font-bold">help</span> to see available commands
				</>,
			),
		],
		history: [],
		historyIndex: -1,
		cwd: "/",
		running: false,
		completionIndex: 0,
		completionOptions: [],
	});

	const set = useCallback((key: keyof TerminalState, value: unknown) => {
		setState((state) => ({ ...state, [key]: value }));
	}, []);

	return { state, set };
};

export function Terminal({
	className,
	onExit,
}: { className?: string; onExit: () => void }) {
	const { state, set } = useTerminalState();
	const commands = useCommands({ state, set });
	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			set("input", e.target.value);
		},
		[set],
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
							}),
						),
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
			} else if (e.key === "Tab") {
				e.preventDefault();
				if (state.completionOptions.length === 0) {
					const [command, ...args] = state.input.split(" ");
					const foundCommand = commands.find((e) => e.name === command);
					if (!foundCommand) return;
					const completionOptions = foundCommand.complete?.(args);
					if (completionOptions?.length === 1) {
						set("input", `${command} ${completionOptions[0]}`);
					} else {
						set("completionOptions", completionOptions);
						set("completionIndex", 0);
					}
				} else {
					set(
						"input",
						state.input.replace(
							/(\S+)$/,
							state.completionOptions[
								state.completionIndex % state.completionOptions.length
							],
						),
					);
					set("completionIndex", state.completionIndex + 1);
				}
			}
		},
		[state, set, commands, onExit],
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const terminal = document.getElementById("terminal");
		if (terminal) {
			terminal.scrollTop = terminal.scrollHeight;
		}
	}, [state.output]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const input = document.querySelector("#terminal input");
		if (input) {
			(input as HTMLInputElement).focus();
		}
	}, [state.running]);

	const { user } = useUser();

	return (
		<div
			className={cn(
				"h-full w-full overflow-y-auto rounded-md font-mono",
				className,
			)}
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
					<div key={index.toString()} className="">
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

const DEFAULT_CODE = `// Welcome to my portfolio!
// Feel free to play around with the code below
// and see the results in the console!

class Visitor {
    constructor(isSmart) {
        this.isSmart = isSmart;
    }
}

const me = new Visitor(false);

openConsole(me);
`;

export function Editor({
	openConsole,
}: {
	openConsole: (person: any) => void;
}) {
	const [result, setResult] = useState<string | null>(null);
	const [value, setValue] = useState(DEFAULT_CODE);
	const ref = useRef<any>(null);
	const { resolvedColorScheme } = useColorScheme();

	useEffect(() => {
		ref.current?.editor.setOption(
			"theme",
			resolvedColorScheme === "dark" ? "dark" : "light",
		);
	}, [resolvedColorScheme]);

	// min-width: 1024px
	const [shouldDisplayEditor, setShouldDisplayEditor] = useState(false);
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setShouldDisplayEditor(true);
			} else {
				setShouldDisplayEditor(false);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	function myCompletions(context: any) {
		const word = context.matchBefore(/\w*/);
		if (word.from === word.to && !context.explicit) return null;
		return {
			from: word.from,
			options: [{ label: "openConsole", type: "function" }],
		};
	}
	return (
		<>
			{shouldDisplayEditor && (
				<>
					<div className="relative hidden lg:block">
						<div className="lg:!w-[40vw] lg:!h-[40svh] !w-[75vw] !h-[50svh] lg:mt-0 mt-8 mb-8 lg:mb-0 rounded-md">
							<CodeMirror
								value={value}
								onChange={(value) => {
									setValue(value);
								}}
								extensions={[javascript({})]}
								theme={(resolvedColorScheme === "dark"
									? githubDarkInit
									: githubLightInit)({
									settings: {
										background:
											resolvedColorScheme === "dark" ? "#292524" : "#F4F4F5",
										gutterBackground:
											resolvedColorScheme === "dark" ? "#332E2D" : "#E2E2E5",
									},
								})}
								width="100%"
								height="100%"
								className="text-lg"
							/>
						</div>

						<Button
							variant="secondary"
							className="absolute top-8 lg:top-0 right-0 p-2 m-2 border-none bg-transparent"
							onClick={async () => {
								console.log("Run code", value);
								const res = await eval(value);
								setResult(res);
							}}
						>
							<Play className="w-6 h-6 text-gray-400" />
						</Button>
					</div>
					<pre className="bg-accent bg-opacity-80 p-4 rounded-md mt-2 mb-4 lg:mb-0">
						{"> "}
						<span className="dark:text-gray-400 text-gray-600">
							{result ?? "Run the code to see the result"}
						</span>
					</pre>
				</>
			)}
		</>
	);
}

const CWD_ALIASES = {
	"/home/cstef": "~",
};

const formatCWD = (cwd: string) => {
	return CWD_ALIASES[cwd as keyof typeof CWD_ALIASES] ?? cwd;
};
