import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { EVENTS } from "@/lib/constants";

export function Timeline() {
	return (
		<>
			<div className="relative wrap overflow-hidden p-10 h-full w-full hidden sm:block">
				<div
					className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border"
					style={{
						left: "50%",
					}}
				></div>
				{EVENTS.map((item, index) => (
					<motion.div
						key={index}
						className={cn("mb-8 flex justify-between items-center w-full", {
							"flex-row-reverse": index % 2 === 0,
						})}
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
						viewport={{ once: true }}
					>
						<div
							className={cn("order-1 w-5/12 flex flex-row items-center", {
								"justify-start": index % 2 === 0,
								"justify-end": index % 2 === 1,
							})}
						>
							<h3 className={"mb-3 font-bold text-2xl text-muted-foreground"}>
								{item.date}
							</h3>
						</div>
						<div className="z-[9] flex items-center order-1 bg-muted-foreground shadow-xl w-6 h-6 rounded-full" />
						<motion.div
							className={cn(
								"order-1 w-5/12 px-8 py-6 rounded-lg border bg-card text-card-foreground flex flex-col justify-center cursor-pointer",
								{
									"items-start": index % 2 === 0,
									"items-end": index % 2 === 1,
								}
							)}
							whileHover={{ scale: 1.05 }}
						>
							<h3 className={"mb-3 font-bold text-2xl"}>{item.title}</h3>
							<p className={"text-muted-foreground"}>{item.description}</p>
						</motion.div>
					</motion.div>
				))}
			</div>
			<div className="flex flex-col gap-4 items-center justify-center p-4 w-full sm:hidden">
				{EVENTS.map((item, index) => (
					<>
						<h2 className="font-bold text-2xl text-muted-foreground">{item.date}</h2>
						<motion.div
							className="px-8 py-6 rounded-lg border bg-card text-card-foreground flex flex-col justify-center cursor-pointer"
							whileInView={{
								x: 0,
							}}
							initial={{ x: index % 2 === 0 ? 200 : -200 }}
							viewport={{ once: true }}
						>
							<h3 className={"mb-3 font-bold text-2xl"}>{item.title}</h3>
							<p className={"text-muted-foreground"}>{item.description}</p>
						</motion.div>
					</>
				))}
			</div>
		</>
	);
}
