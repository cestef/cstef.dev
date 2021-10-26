import React, {
    useRef,
    useLayoutEffect,
    useEffect,
    useMemo,
    FC,
    useCallback,
    useState,
} from "react";
import styled from "styled-components";
import { IConfettiProps, IParticle } from "./types";
import { createNewParticle, drawParticle } from "./lib";
import { Vector2 } from "../../utils/Vector2";

export * from "./types";
const Wrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
`;

export const Confetti: FC<IConfettiProps> = ({
    launchPoints: launchPointsProp,
    burstAmount = 150,
    afterBurstAmount = 50,
    gravity: gravityProp = new Vector2(0, 0.1),
    onEnd,
    delay = 0,
    palette = ["#25DEB3", "#00A8FF", "#EE295C", "#FFF027", "#66BEEC"],
    ...restProps
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const active = useRef(false);
    const particles = useRef<IParticle[]>([]);
    const maxParticles = burstAmount + afterBurstAmount;
    const particlesSpawnCount = useRef(0);
    const launchPointsFallback = useMemo(
        () => [
            () => ({
                x: window.innerWidth / 2,
                y: window.innerHeight,
                angle: 0,
                spreadAngle: Math.PI,
            }),
        ],
        []
    );

    // Handle delay
    const [delayDone, setDelayDone] = useState(false);
    useEffect(() => {
        if (!delay) {
            setDelayDone(true);
        }
        const t = setTimeout(() => setDelayDone(true), delay);
        return () => clearTimeout(t);
    }, [delay]);

    const lastGravity = useRef(new Vector2(0, 0.1));
    const gravity = useMemo(() => {
        if (gravityProp.x !== lastGravity.current.x || gravityProp.y !== lastGravity.current.y) {
            return gravityProp;
        }
        return lastGravity.current;
    }, [gravityProp]);

    const launchPoints = launchPointsProp || launchPointsFallback;

    const handleEnd = useCallback(() => {
        if (onEnd) {
            onEnd();
        }
        // TODO: setEnded state and render null
        active.current = false;
    }, [onEnd]);

    useEffect(() => {
        if (!delayDone) {
            return;
        }
        launchPoints.forEach((launchPoint) => {
            for (let i = 0, n = burstAmount; i < n; i++) {
                particles.current.push(createNewParticle(launchPoint, palette));
            }
        });
    }, [delayDone, particles, launchPoints, burstAmount, palette]);

    useLayoutEffect(() => {
        if (!delayDone) {
            return;
        }
        const canvas = canvasRef && canvasRef.current;
        const ctx = canvas && canvas.getContext && canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        active.current = true;

        const spawner = setInterval(() => {
            launchPoints.forEach((launchPoint) => {
                particles.current.push(createNewParticle(launchPoint, palette));
                particlesSpawnCount.current++;
            });

            if (particlesSpawnCount.current > maxParticles) {
                clearInterval(spawner);
            }
        }, 1000 / 30);

        const cleaner = setInterval(() => {
            particles.current = particles.current.filter(
                (particle) => particle.position.y < window.innerHeight + 200
            );

            if (particlesSpawnCount.current > 0 && particles.current.length <= 0) {
                clearInterval(cleaner);
                handleEnd();
            }
        }, 1000);

        const render = () => {
            if (!active.current) {
                return;
            }

            if (canvas) {
                // Empty and resize the canvas
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }

            for (let i = 0, n = particles.current.length; i < n; i++) {
                const particle = particles.current[i];

                if (particle.position.y > window.innerHeight + 200) {
                    continue;
                }

                particle.velocity.multiplyScalar(particle.friction);
                particle.rotationVelocity *= particle.friction;

                particle.velocity.add(gravity);
                particle.position.add(particle.velocity);
                particle.rotation += particle.rotationVelocity;

                drawParticle(ctx, particle);
            }
        };
        const rafRender = () => requestAnimationFrame(render);
        const renderer = setInterval(rafRender, 1000 / 60);

        return () => {
            active.current = false;
            clearInterval(spawner);
            clearInterval(cleaner);
            clearInterval(renderer);
            particles.current = [];
        };
    }, [
        delayDone,
        canvasRef,
        particles,
        particlesSpawnCount,
        maxParticles,
        launchPoints,
        handleEnd,
        palette,
        gravity,
    ]);

    return (
        <Wrapper {...restProps}>
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />
        </Wrapper>
    );
};
