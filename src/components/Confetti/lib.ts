import { isNil } from "ramda";
import { TLaunchPoint, IParticle } from "./types";
import { Vector2 } from "../../utils/Vector2";

export const lerp = (v0: number, v1: number, t: number) => v0 * (1 - t) + v1 * t;

export const uid = (() => {
    let count = 0;
    return () => count++;
})();

export const createNewParticle = (launchPoint: TLaunchPoint, palette: string[]) => {
    const id = uid();
    const {
        x,
        y,
        angle: angleProp,
        spreadAngle: spreadAngleProp,
        foreground, // TODO: change to z or something
    } = launchPoint();
    const p = 1; //window.innerWidth / 800;
    const initialVelocity = lerp(20, 40, Math.random() * p);
    const spreadAngle = isNil(spreadAngleProp) ? Math.PI / 15 : spreadAngleProp;
    const angleCorrection = angleProp + Math.PI;
    const angle = angleCorrection + lerp(-spreadAngle / 2, spreadAngle / 2, Math.random());

    return {
        id,
        width: lerp(4, 40, Math.random()),
        height: lerp(4, 20, Math.random()),
        rotation: Math.random() * Math.PI,
        rotationVelocity: lerp(-1, 1, Math.random()),
        position: new Vector2(x, y),
        velocity: new Vector2(Math.sin(angle) * initialVelocity, Math.cos(angle) * initialVelocity),
        friction: foreground ? lerp(0.98, 0.99, Math.random()) : lerp(0.96, 0.97, Math.random()),
        color: palette[Math.floor(Math.random() * palette.length)],
    };
};

export const drawParticle = (ctx: CanvasRenderingContext2D, particle: IParticle) => {
    // first save the untranslated/unrotated context

    if (!ctx) {
        return;
    }

    const { position, width, height, rotation, color } = particle;
    const { x, y } = position;

    ctx.save();

    ctx.beginPath();
    // move the rotation point to the center of the rect
    ctx.translate(x + width / 2, y + height / 2);
    // rotate the rect
    ctx.rotate(rotation);

    // draw the rect on the transformed context
    // Note: after transforming [0,0] is visually [x,y]
    //       so the rect needs to be offset accordingly when drawn
    ctx.rect(-width / 2, -height / 2, width, height);

    ctx.fillStyle = color;
    ctx.fill();

    // restore the context to its untranslated/not-rotated state
    ctx.restore();
};
