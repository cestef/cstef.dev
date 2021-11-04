import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home, Portfolio, Projects, Quotes, Contact } from "./routes/";
import Page from "./components/Page";

const App = () => {
    const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");
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
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Navbar setTheme={setThemeMode} theme={theme} />
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
                </Switch>
            </Router>
        </ThemeProvider>
    );
};

export default App;
