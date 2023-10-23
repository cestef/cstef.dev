import { motion } from "framer-motion";

export function Link({ href, children }: { href: string; children: React.ReactNode }) {
	return (
		<motion.a
			// whileHover={{ y: -3 }}
			// transition={{ type: "spring", stiffness: 400, damping: 10 }}
			className="font-bold underline cursor-pointer text-primary-foreground"
			href={href}
		>
			{children}
		</motion.a>
	);
}
