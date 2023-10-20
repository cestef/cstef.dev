import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ColorSchemeProvider } from "./lib/theme.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ColorSchemeProvider>
			<App />
		</ColorSchemeProvider>
	</React.StrictMode>
);
