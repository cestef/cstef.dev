import "./Twemoji.css";

import React, { memo } from "react";

import twemoji from "twemoji";

const Twemoji = ({ emoji }: { emoji: string }) => (
    <span
        dangerouslySetInnerHTML={{
            __html: twemoji.parse(emoji, {
                folder: "svg",
                ext: ".svg",
                base: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/",
            }),
        }}
    />
);

export default memo(Twemoji);
