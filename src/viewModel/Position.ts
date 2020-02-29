const tileSize: number = 64;
const tileSizeY: number = 64 - 16;

export class Position {
    constructor(public x: number, public y: number) { }

    isEqual(other: Position) {
        return this.x === other.x && this.y === other.y;
    }

    toDisplayCoords(): { x: number, y: number } {
        return {
            x: this.x * tileSize + this.y * tileSize / 2,
            y: this.y * tileSizeY,
        }
    }

    add(other: Position): Position {
        return new Position(this.x + other.x, this.y + other.y);
    }

    difference(other: Position): Position {
        return new Position(this.x - other.x, this.y - other.y);
    }
}
