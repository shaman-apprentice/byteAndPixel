const tileSize: number = 64;
const tileSizeY: number = 64-16;

export class Position {
    constructor(public x: number, public y: number) {}

    isEqual(other: Position) {
        return this.x === other.x && this.y === other.y;
    }

    toDisplayCoords(): {x: number, y: number} {
        return {
            x: this.x * tileSize + this.y * tileSize / 2, 
            y: this.y * tileSizeY,
        }
    }

    toString(): String {
        return this.x.toString() + ":" + this.y.toString();
    }
}