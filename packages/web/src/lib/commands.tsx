import { Output, TerminalState } from "@/components/composed/terminal";
import { getAtPath } from "./utils";
import path from "path";
import { FILE_TREE } from "./constants";

export enum ControlCodes {
	RESET,
	EXIT,
}

interface Command {
	name: string;
	description: string;
	run: (args: string[]) => PromiseLike<ControlCodes | Output[]> | ControlCodes | Output[];
}

export const useCommands = ({
	state,
	set,
}: {
	state: TerminalState;
	set: (key: keyof TerminalState, value: unknown) => void;
}) => {
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
				return dir.children.map(
					(file) =>
						new Output(
							`${file.name}${file.type === "dir" ? "/" : ""}`,
							file.type === "dir" ? "font-bold" : ""
						)
				);
			},
		},
		{
			name: "cd",
			description: "Change directory",
			run: (args) => {
				const resolvedPath = path.resolve(state.cwd, args[0] ?? ".");
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
		{
			name: "sudo",
			description: "Run a command as root",
			run: () => {
				return [
					new Output(
						`With great power comes great responsibility...`,
						"text-destructive"
					),
				];
			},
		},
		{
			name: "help",
			description: "Display this help message",
			run: () => {
				return [
					new Output("Available commands:", "font-bold"),
					...commands.map((command) => {
						return new Output(
							(
								<>
									<span className="font-bold">{command.name}</span> -{" "}
									<span className="text-muted-foreground">
										{command.description}
									</span>
								</>
							)
						);
					}),
				];
			},
		},
		{
			name: "exit",
			description: "Exit the terminal",
			run: () => ControlCodes.EXIT,
		},
		{
			name: "download",
			description: "Download a file",
			run: (args) => {
				const resolvedPath = path.resolve(state.cwd, args[0] ?? ".");
				const file = getAtPath(resolvedPath, FILE_TREE);
				if (!file) {
					return [
						new Output(
							`download: no such file or directory: ${args[0]}`,
							"text-destructive"
						),
					];
				}
				if (file.type !== "file") {
					return [new Output(`download: not a file: ${args[0]}`, "text-destructive")];
				}
				const blob = new Blob([file.content], { type: file.contentType ?? "text/plain" });
				const url = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = file.name;
				a.click();
				URL.revokeObjectURL(url);
				document.body.removeChild(a);
				return [];
			},
		},
		{
			name: "submit",
			description: "Send a string to the genie",
			run: async (args) => {
				const string = args.join(" ");
				const res = await fetch("/api/genie", {
					method: "POST",
					body: JSON.stringify({ string }),
				});
				const json = await res.json();
				return [new Output(json.response)];
			},
		},
	];

	return commands;
};
