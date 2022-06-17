import React from "react";

export const isDevice = (() => {
    if (typeof navigator === "undefined") return;

    const ua = navigator.userAgent;

    return {
        info: ua,

        Android() {
            return ua.match(/Android/i);
        },
        BlackBerry() {
            return ua.match(/BlackBerry/i);
        },
        IEMobile() {
            return ua.match(/IEMobile/i);
        },
        iOS() {
            return ua.match(/iPhone|iPad|iPod/i);
        },
        OperaMini() {
            return ua.match(/Opera Mini/i);
        },

        /**
         * Any Device
         */
        any() {
            return (
                this.Android() ||
                this.BlackBerry() ||
                this.iOS() ||
                this.OperaMini() ||
                this.IEMobile()
            );
        },
    };
})();

/**
 * @example const prevProps = usePrevious<PropsDefinition>(props);
 */
export const usePrevious = <T>(value: T) => {
    const ref = React.useRef<T>();
    React.useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};
