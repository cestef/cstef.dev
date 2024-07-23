import { cn } from "@/lib/utils";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
export default function Image({
	src,
	alt,
	className,
	width,
	height,
}: {
	src?: string;
	alt: string;
	className?: string;
	width?: number;
	height?: number;
}) {
	const [loaded, setLoaded] = useState(false);
	return (
		<div className={cn("relative", className)} style={{ width, height }}>
			<Skeleton className="absolute inset-0" />
			<img
				src={src}
				alt={alt}
				className="absolute inset-0 w-full h-full object-cover rounded-sm"
				onLoad={() => setLoaded(true)}
				style={{ filter: loaded ? "blur(0px)" : "blur(10px)" }}
			/>
		</div>
	);
}
