import React, { Fragment } from "react";
import { isDevice, usePrevious } from "./helpers";

type CursorProps = {
    color?: string;
    hideNativeCursor?: boolean;
    innerAlpha?: number;
    innerScale?: number;
    innerSize?: number;
    outerAlpha?: number;
    outerScale?: number;
    outerSize?: number;
    trailingSpeed?: number;
    zIndex?: number;
    innerStyle?: React.CSSProperties;
    outerStyle?: React.CSSProperties;
    clickables?: string[];
};

export type CursorRef = {
    update: () => void;
};

const Cursor = React.forwardRef<CursorRef, CursorProps>((props, ref) => {
    const {
        color = "#dc5a5a",
        hideNativeCursor = true,
        innerAlpha = 1,
        innerScale = 0.7,
        innerSize = 8,
        outerAlpha = 0.3,
        outerScale = 5,
        outerSize = 18,
        trailingSpeed = 8,
        zIndex = 999,
        clickables = [],
    } = props;
    const clickableTargets = [
        "a",
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        "label[for]",
        "select",
        "textarea",
        "button",
        'div[role="button"]',
        ...clickables,
    ];

    const cursorOuterRef = React.useRef<HTMLDivElement>(null);
    const cursorInnerRef = React.useRef<HTMLDivElement>(null);
    const requestRef = React.useRef<number>();
    const previousTimeRef = React.useRef();
    const [coords, setCoords] = React.useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = React.useState(false);
    const [isActive, setIsActive] = React.useState(false);
    const [isActiveClickable, setIsActiveClickable] = React.useState(false);
    const endX = React.useRef(0);
    const endY = React.useRef(0);
    const prevProps = usePrevious<CursorProps>(props);

    // Expose ref
    React.useImperativeHandle(ref, () => ({
        update: () => {
            removeClickableEvents();
            addClickableEvents();

            // Check if the cursor should inactive or not
            const elementMouseIsOver = document.elementFromPoint(coords.x, coords.y);
            const clickables = document.querySelectorAll(clickableTargets.join(","));
            let shouldInactive = true;

            for (let index = 0; index < clickables.length; index++) {
                const element = clickables[index];
                if (element.contains(elementMouseIsOver)) {
                    shouldInactive = false;
                    break;
                }
            }

            shouldInactive && setIsActive(false);
        },
    }));

    // Did mount
    React.useEffect(() => {
        if (isDevice && isDevice.any()) {
            return;
        }

        // Hide / Show global cursor
        if (hideNativeCursor) {
            document.body.style.cursor = "none";
        }

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("mouseover", onMouseEnterViewport);
        window.addEventListener("mouseout", onMouseLeaveViewport);
        addClickableEvents();

        return () => {
            document.body.style.removeProperty("cursor");
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("mouseover", onMouseEnterViewport);
            window.removeEventListener("mouseout", onMouseLeaveViewport);
            removeClickableEvents();
        };
    }, []);

    // Did update
    React.useEffect(() => {
        if (prevProps && prevProps.hideNativeCursor !== hideNativeCursor) {
            if (hideNativeCursor) {
                document.body.style.cursor = "none";
            } else {
                document.body.style.removeProperty("cursor");
            }
        }
    }, [hideNativeCursor]);

    // Outer Cursor Animation Delay
    const animateOuterCursor = React.useCallback(
        (time) => {
            if (previousTimeRef.current !== undefined) {
                coords.x += (endX.current - coords.x) / trailingSpeed;
                coords.y += (endY.current - coords.y) / trailingSpeed;
                const { current: cursorOuter } = cursorOuterRef;
                if (!cursorOuter) return;
                cursorOuter.style.top = `${coords.y}px`;
                cursorOuter.style.left = `${coords.x}px`;
            }
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animateOuterCursor);
        },
        [requestRef]
    );

    // RAF for animateOuterCursor
    React.useEffect(() => {
        requestRef.current = requestAnimationFrame(animateOuterCursor);
        return () => {
            if (typeof requestRef.current === "number") {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [animateOuterCursor]);

    // Mouse Events State updates
    // Primary Mouse Move event
    const onMouseMove = React.useCallback(({ clientX, clientY }) => {
        setCoords({ x: clientX, y: clientY });
        const { current: cursorInner } = cursorInnerRef;
        if (!cursorInner) return;
        cursorInner.style.top = `${clientY}px`;
        cursorInner.style.left = `${clientX}px`;
        endX.current = clientX;
        endY.current = clientY;
    }, []);

    const onMouseDown = React.useCallback(() => {
        setIsActive(true);
    }, []);

    const onMouseUp = React.useCallback(() => {
        setIsActive(false);
    }, []);

    const onMouseEnterViewport = React.useCallback(() => {
        setIsVisible(true);
    }, []);

    const onMouseLeaveViewport = React.useCallback(() => {
        setIsVisible(false);
    }, []);

    // Cursors Hover/Active State
    React.useEffect(() => {
        const { current: cursorInner } = cursorInnerRef;
        const { current: cursorOuter } = cursorOuterRef;
        if (!cursorInner || !cursorOuter) return;

        if (isActive) {
            cursorInner.style.transform = `translate(-50%, -50%) scale(${innerScale})`;
            cursorOuter.style.transform = `translate(-50%, -50%) scale(${outerScale})`;
        } else {
            cursorInner.style.transform = "translate(-50%, -50%) scale(1)";
            cursorOuter.style.transform = "translate(-50%, -50%) scale(1)";
        }
    }, [innerScale, outerScale, isActive]);

    // Cursors Click States
    React.useEffect(() => {
        const { current: cursorInner } = cursorInnerRef;
        const { current: cursorOuter } = cursorOuterRef;
        if (!cursorInner || !cursorOuter) return;

        if (isActiveClickable) {
            cursorInner.style.transform = `translate(-50%, -50%) scale(${innerScale * 1.2})`;
            cursorOuter.style.transform = `translate(-50%, -50%) scale(${outerScale * 1.4})`;
        }
    }, [innerScale, outerScale, isActiveClickable]);

    // Cursor Visibility State
    React.useEffect(() => {
        const { current: cursorInner } = cursorInnerRef;
        const { current: cursorOuter } = cursorOuterRef;
        if (!cursorInner || !cursorOuter) return;

        if (isVisible) {
            cursorInner.style.opacity = String(innerAlpha);
            cursorOuter.style.opacity = String(outerAlpha);
        } else {
            cursorInner.style.opacity = "0";
            cursorOuter.style.opacity = "0";
        }
    }, [isVisible]);

    // Target all possible clickables
    const onClickableMouseOver = React.useCallback(() => {
        setIsActive(true);
    }, []);

    const onClickableClick = React.useCallback(() => {
        setIsActive(true);
        setIsActiveClickable(false);
    }, []);

    const onClickableMouseDown = React.useCallback(() => {
        setIsActiveClickable(true);
    }, []);

    const onClickableMouseUp = React.useCallback(() => {
        setIsActive(true);
    }, []);

    const onClickableMouseOut = React.useCallback(() => {
        setIsActive(false);
        setIsActiveClickable(false);
    }, []);

    const addClickableEvents = React.useCallback(() => {
        const clickables = document.querySelectorAll(clickableTargets.join(","));
        clickables.forEach((el) => {
            if (hideNativeCursor) {
                (el as HTMLElement).style.cursor = "none";
            } else {
                (el as HTMLElement).style.removeProperty("cursor");
            }

            el.addEventListener("mouseover", onClickableMouseOver);
            el.addEventListener("click", onClickableClick);
            el.addEventListener("mousedown", onClickableMouseDown);
            el.addEventListener("mouseup", onClickableMouseUp);
            el.addEventListener("mouseout", onClickableMouseOut);
        });
    }, []);

    const removeClickableEvents = React.useCallback(() => {
        const clickables = document.querySelectorAll(clickableTargets.join(","));
        clickables.forEach((el) => {
            el.removeEventListener("mouseover", onClickableMouseOver);
            el.removeEventListener("click", onClickableClick);
            el.removeEventListener("mousedown", onClickableMouseDown);
            el.removeEventListener("mouseup", onClickableMouseUp);
            el.removeEventListener("mouseout", onClickableMouseOut);
        });
    }, []);

    // Cursor Styles
    const styles: { cursorInner: React.CSSProperties; cursorOuter: React.CSSProperties } = {
        cursorInner: {
            zIndex,
            display: "block",
            position: "fixed",
            borderRadius: "50%",
            width: innerSize,
            height: innerSize,
            pointerEvents: "none",
            backgroundColor: color,
            transition: "opacity 0.15s ease-in-out, transform 0.25s ease-in-out",
            opacity: 0,
            ...props.innerStyle,
        },
        cursorOuter: {
            zIndex,
            display: "block",
            position: "fixed",
            borderRadius: "50%",
            pointerEvents: "none",
            width: outerSize,
            height: outerSize,
            backgroundColor: color,
            transition: "opacity 0.15s ease-in-out, transform 0.15s ease-in-out",
            willChange: "transform",
            opacity: 0,
            ...props.outerStyle,
        },
    };

    return (
        <Fragment>
            <div ref={cursorOuterRef} style={styles.cursorOuter} />
            <div ref={cursorInnerRef} style={styles.cursorInner} />
        </Fragment>
    );
});

export default Cursor;
