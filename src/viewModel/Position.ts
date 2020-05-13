export const tileSize: number = 64;
const displayTileSizeX: number = tileSize;
const displayTileSizeY: number = tileSize * 0.75;

export class Position {
    constructor(public x: number, public y: number) { }

    static toString(p: Position) {
        return `${p.x}-${p.y}`;
    }

    isEqual(other: Position) {
        return this.x === other.x && this.y === other.y;
    }

    toDisplayCoords(): { x: number, y: number } {
        return {
            x: this.x * displayTileSizeX + this.y * displayTileSizeX / 2,
            y: this.y * displayTileSizeY,
        }
    }

    add(other: Position): Position {
        return new Position(this.x + other.x, this.y + other.y);
    }

    difference(other: Position): Position {
        return new Position(this.x - other.x, this.y - other.y);
    }
}
