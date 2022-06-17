import { AssignmentInd, FormatQuote, Home, Mail, Menu, Work } from "@mui/icons-material";
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery,
    useScrollTrigger,
} from "@mui/material";
import { styled } from "@mui/system";
import { cloneElement, useState } from "react";
import { useHistory } from "react-router";
import { Link as L } from "react-router-dom";
import LightSwitch from "../LightSwitch";
import IOSSwitch from "../IOSSwitch/index";

export const Navbar = ({ setTheme, theme }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const history = useHistory();
    const navigate = (path: string) => {
        setDrawerOpen(false);
        history.push(path);
    };
    const Link = styled(L)({});
    function ElevationScroll(props: any) {
        const { children, window } = props;
        const trigger = useScrollTrigger({
            disableHysteresis: true,
            threshold: 0,
            target: window ? window() : undefined,
        });
        return cloneElement(children, {
            elevation: trigger ? 4 : 0,
        });
    }
    const isBig = useMediaQuery(theme.breakpoints.up("md"));
    return (
        <>
            <ElevationScroll>
                <AppBar position="sticky" color="transparent" sx={{ zIndex: 10 }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => setDrawerOpen((e) => !e)}
                        >
                            <Menu />
                        </IconButton>
                        <Link to="/" sx={{ textDecoration: "none", color: "text.primary" }}>
                            <Typography variant="h5" sx={{ ml: [0, null, 2], mt: 0.5 }} id="title">
                                cstef.dev
                            </Typography>
                        </Link>
                        <Box sx={{ flexGrow: 1 }} />

                        {isBig ? (
                            <LightSwitch setTheme={setTheme} />
                        ) : (
                            <IOSSwitch
                                onChange={(e) => {
                                    setTheme((e) => (e === "dark" ? "light" : "dark"));
                                }}
                                checked={theme.palette.mode === "light"}
                            />
                        )}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Drawer anchor={"left"} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <List>
                    <ListItem
                        button
                        sx={{ pl: 3, pr: 6, cursor: "none" }}
                        onClick={() => navigate("/")}
                    >
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItem>

                    <ListItem
                        button
                        sx={{ pl: 3, pr: 6, cursor: "none" }}
                        onClick={() => navigate("/portfolio")}
                    >
                        <ListItemIcon>
                            <AssignmentInd />
                        </ListItemIcon>
                        <ListItemText primary={"Portfolio"} />
                    </ListItem>

                    <ListItem
                        button
                        sx={{ pl: 3, pr: 6, cursor: "none" }}
                        onClick={() => navigate("/projects")}
                    >
                        <ListItemIcon>
                            <Work />
                        </ListItemIcon>
                        <ListItemText primary={"Projects"} />
                    </ListItem>

                    <ListItem
                        button
                        sx={{ pl: 3, pr: 6, cursor: "none" }}
                        onClick={() => navigate("/quotes")}
                    >
                        <ListItemIcon>
                            <FormatQuote />
                        </ListItemIcon>
                        <ListItemText primary={"Quotes"} />
                    </ListItem>
                    <ListItem
                        button
                        sx={{ pl: 3, pr: 6, cursor: "none" }}
                        onClick={() => navigate("/contact")}
                    >
                        <ListItemIcon>
                            <Mail />
                        </ListItemIcon>
                        <ListItemText primary={"Contact"} />
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};
