import { motion, useCycle } from "framer-motion";
import { useRef } from "react";
import { useDimensions } from "../../functions/use-dimensions";
import { MenuToggle } from "./MenuToggle";
import "./Navbar.css";
import { Navigation } from "./Navigation";
const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: "circle(0px at 40px 40px)",
        transition: {
            delay: 0.3,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
};

export const Navbar = () => {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
        >
            <motion.div className="background" variants={sidebar} />
            <Navigation toggle={toggleOpen} />
            <MenuToggle toggle={toggleOpen} />
        </motion.nav>
    );
};
