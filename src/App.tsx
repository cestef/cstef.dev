import {
	Contact,
	Home,
	NotFound,
	Portfolio,
	Projects,
	Quotes,
} from "./routes/";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import {
	StyledEngineProvider,
	Theme,
	ThemeProvider,
	adaptV4Theme,
	createTheme,
} from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";

import Cursor from "./components/Cursor";
import { CursorRef } from "./components/Cursor/index";
import { Navbar } from "./components/Navbar";
import Page from "./components/Page";

declare module "@mui/styles/defaultTheme" {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface DefaultTheme extends Theme {}
}

const App = () => {
	const [themeMode, setThemeMode] = useState<"dark" | "light">(
		(localStorage.getItem("theme") as any) || "dark",
	);
	const theme = createTheme(
		adaptV4Theme({
			palette: { mode: themeMode },
			components: {
				MuiContainer: {
					styleOverrides: {
						root: {
							marginTop: 50,
						},
					},
				},
				MuiPaper: {
					styleOverrides: {
						elevation0: {
							backgroundColor: themeMode === "dark" ? "#1e1e1e" : "#fff",
						},
					},
				},
			},
		}),
	);
	useEffect(() => {
		document.body.classList.add(themeMode);
		document.body.classList.remove(themeMode === "dark" ? "light" : "dark");
	}, [themeMode]);
	const setTheme = (theme) => {
		localStorage.setItem("theme", themeMode === "dark" ? "light" : "dark");
		setThemeMode(theme);
	};
	const cursorRef = useRef<CursorRef>(null);
	useEffect(() => {
		const observer = new MutationObserver((mutation) => {
			const addedNodes = mutation
				.flatMap((e) =>
					e.addedNodes.length ? [...e.addedNodes].filter(Boolean) : null,
				)
				.filter(Boolean);
			if (addedNodes.length > 0) cursorRef.current?.update();
		});
		observer.observe(document.body, {
			attributes: true,
			subtree: true,
			childList: true,
		});
		return () => observer.disconnect();
	}, []);
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<Cursor
					ref={cursorRef}
					innerSize={8}
					outerSize={8}
					color={themeMode === "dark" ? "#fff" : "#4e4e4e"}
					outerAlpha={0.2}
					innerScale={0.7}
					outerScale={5}
					innerStyle={{
						zIndex: 2000,
					}}
					outerStyle={{
						zIndex: 2001,
					}}
					clickables={[
						".link",
						'div[role="button"]',
						"#light-switch",
						"#title",
						"#switch",
					]}
				/>
				<Router>
					<Navbar setTheme={setTheme} theme={theme} />
					<Switch>
						<Route
							exact
							path="/"
							render={(props) => (
								<Page {...props} component={Home} title="Home" />
							)}
						/>
						{/* <Route
                            exact
                            path="/quotes"
                            render={(props) => <Page {...props} component={Quotes} title="Quotes" />}
                        /> */}
						<Route
							exact
							path="/projects"
							render={(props) => (
								<Page {...props} component={Projects} title="Projects" />
							)}
						/>
						<Route
							exact
							path="/portfolio"
							render={(props) => (
								<Page {...props} component={Portfolio} title="Portfolio" />
							)}
						/>
						<Route
							exact
							path="/contact"
							render={(props) => (
								<Page {...props} component={Contact} title="Contact" />
							)}
						/>
						<Route component={NotFound} />
					</Switch>
				</Router>
			</ThemeProvider>
		</StyledEngineProvider>
	);
};

export default App;
