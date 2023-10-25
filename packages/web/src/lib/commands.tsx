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
				return file.content?.split("\n").map((line) => new Output(line)) ?? [];
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
				if (file.content) {
					const blob = new Blob([file.content], {
						type: file.contentType ?? "text/plain",
					});
					const url = URL.createObjectURL(blob);
					const a = document.createElement("a");
					a.href = url;
					a.download = file.name;
					a.click();
					URL.revokeObjectURL(url);
				} else if (file.path) {
					const a = document.createElement("a");
					a.href = file.path;
					a.download = file.name;
					a.click();
				} else {
					return [
						new Output(`download: file has no content: ${args[0]}`, "text-destructive"),
					];
				}
				return [];
			},
		},
		{
			name: "submit",
			description: "Send a string to the genie",
			run: async (args) => {
				try {
					const string = args.join(" ");
					const res = await fetch(import.meta.env.VITE_API_URL + "/validate", {
						method: "POST",
						body: JSON.stringify({ flag: string }),
						headers: {
							"Content-Type": "application/json",
						},
					});
					const json = (await res.json()) as {
						statusCode?: number;
						success: boolean;
					};
					if (json.statusCode === 429)
						return [
							new Output(
								"The genie is tired. Try again in a few minutes.",
								"text-destructive"
							),
						];

					return [
						new Output(
							json.success
								? "The genie is pleased."
								: "The genie is displeased. Try again.",
							json.success ? "text-green-500" : "text-destructive"
						),
					];
				} catch (e) {
					return [
						new Output(
							"Looks like the genie is sleeping. Try again later.",
							"text-destructive"
						),
					];
				}
			},
		},
	];

	return commands;
};
