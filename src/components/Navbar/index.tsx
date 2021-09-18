import { AssignmentInd, FormatQuote, Home, Menu, Work } from "@mui/icons-material";
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
} from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
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
    return (
        <>
            <AppBar position="sticky">
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
                        <Typography variant="h5" sx={{ ml: 2, mt: 0.5 }}>
                            cstef.dev
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
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
                </List>
            </Drawer>
        </>
    );
};
