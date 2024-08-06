import { SOCIALS } from "@/lib/constants";
import { motion } from "framer-motion";
import { match } from "ts-pattern";
import { CopyContent } from "../composed/copy";
import { LinkPreview } from "../composed/link-preview";
import { Spotify } from "../composed/spotify";

export default function Socials() {
	return (
		<div className="lg:mt-32 flex flex-col justify-center items-center">
			<motion.h2
				animate={{ scale: [0.2, 1] }}
				transition={{ type: "spring", stiffness: 300, damping: 20 }}
				className="text-3xl sm:text-4xl font-bold mb-10"
			>
				Find me on
			</motion.h2>
			<div className="flex flex-wrap justify-center items-center gap-4 mx-4">
				{SOCIALS.map((social) =>
					match(social.variant)
						.with("copy", () => (
							<CopyContent content={social.url}>
								<motion.div
									className="flex flex-row justify-center items-center bg-accent rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm cursor-pointer"
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
								>
									{social.icon}
								</motion.div>
							</CopyContent>
						))
						.with("link", () => (
							<LinkPreview url={social.url}>
								<a href={social.url} target="_blank" rel="noopener noreferrer">
									<motion.div
										className="flex flex-row justify-center items-center bg-accent rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm"
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										initial={{ opacity: 0 }}
										whileInView={{ opacity: 1 }}
										viewport={{ once: true }}
									>
										{social.icon}
									</motion.div>
								</a>
							</LinkPreview>
						))
						.with("spotify", () => (
							<Spotify url={social.url}>
								<motion.div
									className="flex flex-row justify-center items-center bg-accent rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm"
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
								>
									{social.icon}
								</motion.div>
							</Spotify>
						))
						.exhaustive(),
				)}
			</div>
		</div>
	);
}
