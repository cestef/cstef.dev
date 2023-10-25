import { motion } from "framer-motion";

export function Bold({ children }: { children: React.ReactNode }) {
	return (
		<motion.p
			whileHover={{ y: -3 }}
			transition={{ type: "spring", stiffness: 400, damping: 20 }}
			className="font-bold cursor-pointer"
		>
			{children}
		</motion.p>
	);
}
