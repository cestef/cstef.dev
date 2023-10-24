import { motion } from "framer-motion";
import { Timeline } from "../composed/timeline";

export default function AboutMe() {
	return (
		<div className="mt-32 w-full flex flex-col justify-center items-center">
			<motion.h2
				whileInView={{ scale: [0.2, 1] }}
				viewport={{ once: true }}
				transition={{ type: "spring", stiffness: 300, damping: 20 }}
				className="text-3xl sm:text-4xl font-bold mb-10"
			>
				About me
			</motion.h2>
			<Timeline />
		</div>
	);
}
