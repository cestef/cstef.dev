import React, { memo } from "react";
import twemoji from "twemoji";
import "./Twemoji.css";
const Twemoji = ({ emoji }: { emoji: string }) => (
    <span
        dangerouslySetInnerHTML={{
            __html: twemoji.parse(emoji, {
                folder: "svg",
                ext: ".svg",
            }),
        }}
    />
);

export default memo(Twemoji);
