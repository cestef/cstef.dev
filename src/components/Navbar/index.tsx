import { AssignmentInd, FormatQuote, Home, Mail, Menu, Work } from "@mui/icons-material";
import {
    AppBar,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useScrollTrigger,
} from "@mui/material";
import { styled } from "@mui/system";
import { cloneElement, useState } from "react";
import { useHistory } from "react-router";
import { Link as L } from "react-router-dom";

export const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const history = useHistory();
    const navigate = (path: string) => {
        setDrawerOpen(false);
        history.push(path);
    };
    const Link = styled(L)({});
    function ElevationScroll(props: any) {
        const { children, window } = props;
        // Note that you normally won't need to set the window ref as useScrollTrigger
        // will default to window.
        // This is only being set here because the demo is in an iframe.
        const trigger = useScrollTrigger({
            disableHysteresis: true,
            threshold: 0,
            target: window ? window() : undefined,
        });

        return cloneElement(children, {
            elevation: trigger ? 4 : 0,
        });
    }
    return (
        <>
            {/* <div className="shape-blob"></div>
            <div className="shape-blob one"></div>
            <div className="shape-blob two"></div> */}
            <ElevationScroll>
                <AppBar position="sticky" color="inherit" sx={{ zIndex: 10 }}>
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
                        <Link to="/" sx={{ textDecoration: "none", color: "inherit" }}>
                            <Typography variant="h5" sx={{ ml: [0, null, 2], mt: 0.5 }}>
                                cstef.dev
                            </Typography>
                        </Link>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Drawer anchor={"left"} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <List>
                    <ListItem button sx={{ pl: 3, pr: 6 }} onClick={() => navigate("/")}>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItem>

                    <ListItem button sx={{ pl: 3, pr: 6 }} onClick={() => navigate("/portfolio")}>
                        <ListItemIcon>
                            <AssignmentInd />
                        </ListItemIcon>
                        <ListItemText primary={"Portfolio"} />
                    </ListItem>

                    <ListItem button sx={{ pl: 3, pr: 6 }} onClick={() => navigate("/projects")}>
                        <ListItemIcon>
                            <Work />
                        </ListItemIcon>
                        <ListItemText primary={"Projects"} />
                    </ListItem>

                    <ListItem button sx={{ pl: 3, pr: 6 }} onClick={() => navigate("/quotes")}>
                        <ListItemIcon>
                            <FormatQuote />
                        </ListItemIcon>
                        <ListItemText primary={"Quotes"} />
                    </ListItem>
                    <ListItem button sx={{ pl: 3, pr: 6 }} onClick={() => navigate("/contact")}>
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
