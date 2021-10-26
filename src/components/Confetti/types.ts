import { CSSProperties } from "react";
import { Vector2 } from "../../utils/Vector2";

export type TLaunchPoint = () => {
    x: number;
    y: number;
    angle: number;
    spreadAngle?: number;
    foreground?: boolean;
};

export interface IParticle {
    id: number;
    width: number;
    height: number;
    rotation: number;
    rotationVelocity: number;
    position: Vector2;
    velocity: Vector2;
    friction: number;
    color: string;
}

export interface IConfettiProps {
    launchPoints: TLaunchPoint[];
    burstAmount?: number;
    afterBurstAmount?: number;
    palette?: string[];
    gravity?: Vector2;
    onEnd?: () => void;
    style?: CSSProperties;
    delay?: number;
}
