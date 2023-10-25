import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ColorSchemeProvider } from "./lib/theme.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ColorSchemeProvider>
			<TooltipProvider>
				<Toaster />
				<App />
			</TooltipProvider>
		</ColorSchemeProvider>
	</React.StrictMode>
);
