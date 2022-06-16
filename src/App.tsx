import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home, Portfolio, Projects, Quotes, Contact, NotFound } from "./routes/";
import Page from "./components/Page";
import AnimatedCursor from "react-animated-cursor";
const App = () => {
    const [themeMode, setThemeMode] = useState<"dark" | "light">(
        (localStorage.getItem("theme") as any) || "dark"
    );
    const theme = createTheme({
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
                    elevation0: { backgroundColor: themeMode === "dark" ? "#1e1e1e" : "#fff" },
                },
            },
        },
    });
    useEffect(() => {
        document.body.classList.add(themeMode);
        document.body.classList.remove(themeMode === "dark" ? "light" : "dark");
    }, [themeMode]);
    const setTheme = (theme) => {
        localStorage.setItem("theme", themeMode === "dark" ? "light" : "dark");
        setThemeMode(theme);
    };
    return (
        <ThemeProvider theme={theme}>
            <AnimatedCursor
                innerSize={8}
                outerSize={8}
                color={themeMode === "dark" ? "255, 255, 255" : "110, 110, 110"}
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
                    "a",
                    'input[type="text"]',
                    'input[type="email"]',
                    'input[type="number"]',
                    'input[type="submit"]',
                    'input[type="image"]',
                    "label[for]",
                    "select",
                    "textarea",
                    "button",
                    ".link",
                    'div[role="button"]',
                    "#light-switch",
                    "#title",
                ]}
            />
            <Router>
                <Navbar setTheme={setTheme} theme={theme} />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={(props) => <Page {...props} component={Home} title="Home" />}
                    />
                    <Route
                        exact
                        path="/quotes"
                        render={(props) => <Page {...props} component={Quotes} title="Quotes" />}
                    />
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
                        render={(props) => <Page {...props} component={Contact} title="Contact" />}
                    />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </ThemeProvider>
    );
};

export default App;
