import path from "node:path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			path: "path-browserify",
		},
		mainFields: ["global", "module", "main"],
	},
	// Redirect /discord to the discord invite link
	server: {
		proxy: {
			"/discord": "https://discord.gg/CYQwAW2Yuq",
		},
	},
});
