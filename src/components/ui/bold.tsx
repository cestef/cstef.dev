import { motion } from "framer-motion";

export function Bold({ children }: { children: React.ReactNode }) {
	return (
		<motion.p
			whileHover={{ y: -3 }}
			transition={{ type: "spring", stiffness: 400, damping: 10 }}
			className="font-bold cursor-pointer text-primary-foreground/80"
		>
			{children}
		</motion.p>
	);
}
