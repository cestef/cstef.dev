import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Lightbulb } from "lucide-react";
import { useRef } from "react";
import { useColorScheme } from "@/lib/theme";
import { MdLightbulb } from "react-icons/md";

const LightSwitch = () => {
	const { toggleColorScheme } = useColorScheme();
	const switching = useRef(false);
	return (
		<AnimatePresence>
			<div className="absolute right-[7.5vw] top-[-40vh] z-[11]">
				<motion.div
					animate={{ y: [0, 8, 0] }}
					transition={{ repeat: Infinity, duration: 3 }}
					className="hidden md:flex w-[2px] h-[50vh] relative items-end justify-center rounded-[5px] bg-black dark:bg-white"
					drag="y"
					dragConstraints={{ top: 0, bottom: 0 }}
					onDragEnd={(_, info) => {
						if (info.point.y > window.innerHeight / 3.5) {
							switching.current = true;
						}
					}}
					onDragTransitionEnd={() => {
						if (switching.current) {
							toggleColorScheme();
							switching.current = false;
						}
					}}
				>
					<MdLightbulb
						className="hidden md:block rotate-180 absolute -bottom-[68px] cursor-pointer text-yellow-400"
						id="light-switch"
						size={72}
					/>
					<motion.div
						animate={{ y: [0, 8, 0] }}
						transition={{ repeat: Infinity, duration: 3 }}
						className="absolute bottom-[-95px]"
					>
						<ChevronDown />
					</motion.div>
				</motion.div>
			</div>
		</AnimatePresence>
	);
};

export default LightSwitch;
