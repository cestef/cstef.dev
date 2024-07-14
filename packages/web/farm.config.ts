import path from "node:path";
import { defineConfig } from "@farmfe/core";
import farmPluginPostcss from "@farmfe/js-plugin-postcss";

export default defineConfig({
	plugins: ["@farmfe/plugin-react", farmPluginPostcss()],
	compilation: {
		resolve: {
			alias: {
				"@/": path.join(process.cwd(), "src"),
			},
			mainFields: ["global", "module", "main"],
		},
		input: {
			index: "./index.html",
		},
		minify: true,
		// treeShaking: true,
	},
	server: {
		hmr: true,
	},
});
