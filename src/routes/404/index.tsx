import { Button, Container, Typography } from "@mui/material";

import { Box } from "@mui/system";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
export const NotFound = () => {
    const history = useHistory();
    return (
        <Container>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <motion.div
                    animate={{ y: [0, 10, 0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                >
                    <Typography sx={{ fontSize: 200 }} color='text.primary' align='center'>
                        4
                    </Typography>
                </motion.div>
                <motion.div
                    animate={{ y: [0, 10, 0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2.7 }}
                >
                    <Typography sx={{ fontSize: 200 }} color='text.primary' align='center'>
                        0
                    </Typography>
                </motion.div>
                <motion.div
                    animate={{ y: [0, 10, 0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                >
                    <Typography sx={{ fontSize: 200 }} color='text.primary' align='center'>
                        4
                    </Typography>
                </motion.div>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                <Typography variant='h4' color='text.primary' align='center'>
                    Dang sorry I did all I could but I didn't find anything...
                </Typography>
                <Button onClick={() => history.push("/")} sx={{ mt: 3 }} size='large'>
                    Back Home
                </Button>
            </Box>
        </Container>
    );
};
