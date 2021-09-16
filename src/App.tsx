import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home, Portfolio, Projects, Quotes } from "./routes/";

const theme = createTheme({
    palette: { mode: "dark", primary: { main: "#79D8FF" }, secondary: { main: "#66F9E7" } },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/quotes" component={Quotes} />
                    <Route exact path="/projects" component={Projects} />
                    <Route exact path="/portfolio" component={Portfolio} />
                </Switch>
            </Router>
        </ThemeProvider>
    );
};

export default App;
