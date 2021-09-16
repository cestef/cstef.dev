import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

const variants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};

export const Navigation = ({ toggle }: { toggle: () => void }) => (
    <motion.ul variants={variants}>
        <MenuItem path="/" toggle={toggle}>
            Home
        </MenuItem>
        <MenuItem path="/portfolio" toggle={toggle}>
            Portfolio
        </MenuItem>
        <MenuItem path="/projects" toggle={toggle}>
            Projects
        </MenuItem>
        <MenuItem path="/quotes" toggle={toggle}>
            Quotes
        </MenuItem>
    </motion.ul>
);
