import { SOCIALS } from "@/lib/constants";
import { useLastFM } from "@/lib/lastfm";
import { motion } from "framer-motion";
import { Music } from "lucide-react";
import { FaSpotify } from "react-icons/fa";
import { match } from "ts-pattern";
import Image from "../composed/image";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "../ui/hover-card";
import { LinkPreview } from "../composed/link-preview";
import { CopyContent } from "../composed/copy";
import { Spotify } from "../composed/spotify";

export default function Socials() {
	const lastFM = useLastFM("cestef");
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
				{SOCIALS.map((social, index) =>
					match(social.variant)
						.with("copy", () => (
							<CopyContent content={social.url}>
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
							</CopyContent>
						))
						.with("link", () => (
							<LinkPreview url={social.url}>
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
