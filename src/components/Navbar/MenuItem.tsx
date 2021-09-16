import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

const variants: Variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
        display: "flex",
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 },
        },
        display: "none",
    },
};

export const MenuItem = ({
    path,
    children,
    toggle,
}: {
    path: string;
    children: ReactNode;
    toggle: () => void;
}) => {
    return (
        <motion.li variants={variants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <h2 className="menu-item">
                <Link to={path} onClick={toggle}>
                    {children}{" "}
                </Link>
            </h2>
        </motion.li>
    );
};
