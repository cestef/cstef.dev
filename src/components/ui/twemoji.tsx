import { cn } from "@/lib/utils";
import { memo } from "react";

import twemoji from "twemoji";

const Twemoji = ({ emoji, className }: { emoji: string; className?: string }) => {
	return (
		<span
			className={cn("inline-block w-6 h-6 align-text-bottom", className)}
			// rome-ignore lint/security/noDangerouslySetInnerHtml: Need to use dangerouslySetInnerHTML to render twemoji
			dangerouslySetInnerHTML={{
				__html: twemoji.parse(emoji, {
					folder: "svg",
					ext: ".svg",
					base: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/",
				}),
			}}
		/>
	);
};

export default memo(Twemoji);
