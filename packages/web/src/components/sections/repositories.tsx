import { useRepositories } from "@/lib/repositories";
import { getLanguageColor } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Twemoji from "../ui/twemoji";
import { LinkPreview } from "../composed/link-preview";

export default function Repositories() {
	const { isMore, loadMore, repositories, loading } = useRepositories("cestef");

	return (
		<div className="lg:mt-32 mt-8 flex flex-col justify-center items-center">
			<motion.h2
				whileInView={{ scale: [0.2, 1] }}
				viewport={{ once: true }}
				transition={{ type: "spring", stiffness: 300, damping: 20 }}
				className="text-3xl sm:text-4xl font-bold mb-10"
			>
				Latest repositories
			</motion.h2>
			<div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mx-4">
				{repositories.map((repo, index) => (
					<LinkPreview url={repo.url} key={index.toString()}>
						<a href={repo.url} target="_blank" rel="noopener noreferrer">
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
							>
								<Card className="w-72 h-44 flex flex-col justify-center">
									<CardHeader className="-mb-2 flex flex-row items-center justify-center gap-2 text-center">
										<CardTitle>
											{repo.forked && (
												<Tooltip delayDuration={0}>
													<TooltipTrigger>
														<Twemoji emoji="🍴" className="mr-2" />
													</TooltipTrigger>
													<TooltipContent>Forked</TooltipContent>
												</Tooltip>
											)}
											{repo.name}
										</CardTitle>
									</CardHeader>
									<CardContent className="flex flex-col gap-2 items-center justify-center h-full pb-4">
										<p className="text-muted-foreground line-clamp-2">
											{repo.description ?? "No description"}
										</p>
									</CardContent>
									<div className="flex-grow w-full" />
									<CardFooter>
										<div className="flex flex-row justify-between items-center w-full">
											<p>
												{repo.stars} <Twemoji emoji="⭐" />
											</p>
											<p className="flex flex-row justify-between items-center gap-2">
												<div
													className="w-3 h-3 rounded-full"
													style={{
														backgroundColor: getLanguageColor(repo.language),
													}}
												/>
												{repo.language}
											</p>
										</div>
									</CardFooter>
								</Card>
							</motion.div>
						</a>
					</LinkPreview>
				))}
			</div>
			{isMore && (
				<Button
					variant="outline"
					size="jumbo"
					onClick={loadMore}
					className="mt-10"
				>
					{loading && (
						<Loader2 className="w-5 h-5 mr-3 inline-block animate-spin" />
					)}
					Load more
				</Button>
			)}
		</div>
	);
}
