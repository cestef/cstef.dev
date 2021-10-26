export class Vector2 {
    x: number;
    y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(v: Vector2) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    addVectors(a: Vector2, b: Vector2) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        return this;
    }

    multiplyScalar(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
}
