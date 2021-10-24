import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home, Portfolio, Projects, Quotes } from "./routes/";

const App = () => {
    const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");
    const theme = createTheme({
        palette: { mode: themeMode, primary: { main: "#79D8FF" }, secondary: { main: "#66F9E7" } },
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
                <Navbar />
                <Switch>
                    <Route exact path="/">
                        <Home setTheme={setThemeMode} />
                    </Route>
                    <Route exact path="/quotes" component={Quotes} />
                    <Route exact path="/projects" component={Projects} />
                    <Route exact path="/portfolio" component={Portfolio} />
                </Switch>
            </Router>
        </ThemeProvider>
    );
};

export default App;
