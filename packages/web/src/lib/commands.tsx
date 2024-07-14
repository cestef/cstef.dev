import { Output, type TerminalState } from "@/components/composed/editor";
import { getAtPath, getJSON } from "./utils";
import path from "path-browserify";
import { FILE_TREE } from "./constants";
import { getUser, useUser } from "./user";
import { match } from "ts-pattern";
import Spoiler from "@/components/composed/spoiler";

export enum ControlCodes {
	RESET,
	EXIT,
}

interface Command {
	name: string;
	description: string;
	run: (
		args: string[],
	) => PromiseLike<ControlCodes | Output[]> | ControlCodes | Output[];
	complete?: (args: string[]) => string[] | undefined;
}

export const useCommands = ({
	state,
	set,
}: {
	state: TerminalState;
	set: (key: keyof TerminalState, value: unknown) => void;
}) => {
	const { user, mutate: mutateUser } = useUser();
	const commands: Command[] = [
		{
			name: "clear",
			description: "Clear the terminal",
			run: () => ControlCodes.RESET,
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
							"text-destructive",
						),
					];
				}
				if (dir.type !== "dir") {
					return [
						new Output(
							`ls: cannot access '${args[0]}': Not a directory`,
							"text-destructive",
						),
					];
				}
				return dir.children.map(
					(file) =>
						new Output(
							`${file.name}${file.type === "dir" ? "/" : ""}`,
							file.type === "dir" ? "font-bold" : "",
						),
				);
			},
			complete: (args) => {
				const resolvedPath = path.resolve(state.cwd, args[0] ?? ".");
				const dir = getAtPath(resolvedPath, FILE_TREE);
				if (!dir || dir.type !== "dir") return [];
				// Return relative paths
				return dir.children
					.filter((file) => file.type === "dir")
					.map((file) =>
						path.relative(state.cwd, path.resolve(resolvedPath, file.name)),
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
						new Output(
							`cd: no such file or directory: ${args[0]}`,
							"text-destructive",
						),
					];
				}
				if (dir.type !== "dir") {
					return [
						new Output(`cd: not a directory: ${args[0]}`, "text-destructive"),
					];
				}
				set("cwd", resolvedPath);
				return [];
			},
			complete: (args) => {
				const resolvedPath = path.resolve(state.cwd, args[0] ?? ".");
				const dir = getAtPath(resolvedPath, FILE_TREE);
				if (!dir || dir.type !== "dir") return [];
				// Return relative paths
				return dir.children
					.filter((file) => file.type === "dir")
					.map((file) =>
						path.relative(state.cwd, path.resolve(resolvedPath, file.name)),
					);
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
							"text-destructive",
						),
					];
				}
				if (file.type !== "file") {
					return [
						new Output(`cat: not a file: ${args[0]}`, "text-destructive"),
					];
				}
				if (!file.content && !file.path) {
					return [
						new Output(
							`cat: file has no content: ${args[0]}`,
							"text-destructive",
						),
					];
				}

				if (file.content)
					return file.content.split("\n").map((line) => new Output(line)) ?? [];
				else {
					const a = document.createElement("a");
					a.href = file.path as string;
					a.target = "_blank";
					a.click();
					return [];
				}
			},
			complete: (args) => {
				// Only return files
				const resolvedPath = path.resolve(state.cwd, args[0] ?? ".");
				const dir = getAtPath(resolvedPath, FILE_TREE);
				if (!dir || dir.type !== "dir") return [];
				return dir.children
					.filter((file) => file.type === "file")
					.map((file) =>
						path.relative(state.cwd, path.resolve(resolvedPath, file.name)),
					);
			},
		},
		{
			name: "whoami",
			description: "Print current user",
			run: () => [new Output(user?.login ?? "guest")],
		},
		{
			name: "help",
			description: "Display this help message",
			run: () => {
				return [
					new Output("Available commands:", "font-bold"),
					...commands.map((command) => {
						return new Output(
							<>
								<span className="font-bold">{command.name}</span> -{" "}
								<span className="text-muted-foreground">
									{command.description}
								</span>
							</>,
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
							"text-destructive",
						),
					];
				}
				if (file.type !== "file") {
					return [
						new Output(`download: not a file: ${args[0]}`, "text-destructive"),
					];
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
						new Output(
							`download: file has no content: ${args[0]}`,
							"text-destructive",
						),
					];
				}
				return [];
			},
			complete: (args) => {
				// Only return files
				const resolvedPath = path.resolve(state.cwd, args[0] ?? ".");
				const dir = getAtPath(resolvedPath, FILE_TREE);
				if (!dir || dir.type !== "dir") return [];
				return dir.children
					.filter((file) => file.type === "file")
					.map((file) =>
						path.relative(state.cwd, path.resolve(resolvedPath, file.name)),
					);
			},
		},
		{
			name: "submit",
			description: "Submit a flag",
			run: async (args) => {
				if (!user)
					return [
						new Output(
							<>
								<span className="text-destructive">Not logged in.</span>{" "}
								<span>Please log in to submit flags.</span>
							</>,
						),
					];
				try {
					const string = args.join(" ");
					const res = await fetch(import.meta.env.VITE_API_URL + "/validate", {
						method: "POST",
						body: JSON.stringify({ flag: string }),
						headers: {
							"Content-Type": "application/json",
						},
						credentials: "include",
					});
					const json = (await res.json()) as {
						statusCode?: number;
						success: boolean;
						error?: unknown;
					};
					if (json.statusCode === 429)
						return [
							new Output(
								"Please wait a few minutes before submitting another flag.",
								"text-destructive",
							),
						];
					mutateUser();
					return [
						new Output(
							json.success
								? "The flag was accepted."
								: json.error === "INVALID_FLAG"
									? "The flag is invalid."
									: "Please submit flags in the format: flag{...}",
							json.success ? "text-green-500" : "text-destructive",
						),
					];
				} catch (e) {
					return [
						new Output(
							"An error occurred while submitting the flag. Please try again later.",
							"text-destructive",
						),
					];
				}
			},
		},
		{
			name: "login",
			description: "Login with your GitHub account to save your progress",
			run: async () => {
				if (user)
					return [
						new Output(`Already logged in as ${user.login}.`, "text-green-500"),
					];
				const url = import.meta.env.VITE_API_URL + "/login";
				window.open(url, "_blank", "width=500,height=500");

				await new Promise<void>((resolve) => {
					window.addEventListener("message", (e) => {
						if (e.data === "github:success") {
							resolve();
						}
					});
				});
				const newUser = await getUser();
				mutateUser(newUser, false); // false to prevent revalidation
				if (!newUser) return [new Output("Login failed.", "text-destructive")];
				return [new Output(`Logged in as ${newUser.login}.`, "text-green-500")];
			},
		},
		{
			name: "logout",
			description: "Logout of your GitHub account",
			run: async () => {
				if (!user) return [new Output("Not logged in.", "text-destructive")];
				const res = await getJSON<{ success: boolean }>("/logout");
				if (!res.success)
					return [new Output("Logout failed.", "text-destructive")];
				mutateUser(undefined, false); // false to prevent revalidation
				return [new Output(`Logged out.`, "text-green-500")];
			},
		},
		{
			name: "flags",
			description: "List all flags you have submitted",
			run: async () => {
				if (!user) return [new Output("Not logged in.", "text-destructive")];
				if (!user.flags || user.flags.length === 0)
					return [new Output("No flags submitted.", "text-muted-foreground")];
				return user.flags.map(
					(flag) =>
						new Output(
							<>
								<span className="font-bold">{flag.name}</span> -{" "}
								<Spoiler>{flag.value}</Spoiler> -{" "}
								{match(flag.level)
									.with(1, () => <span className="text-green-500">Easy</span>)
									.with(2, () => (
										<span className="text-yellow-500">Medium</span>
									))
									.with(3, () => <span className="text-red-500">Hard</span>)
									.otherwise(() => (
										<span className="text-muted-foreground">Unknown</span>
									))}
							</>,
						),
				);
			},
		},
	];

	return commands;
};
