export const tileSize: number = 64;
export const displayTileSizeX: number = tileSize;
export const displayTileSizeY: number = tileSize * 0.75;

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

    public static STAY: Position = new Position(0, 0);
    public static WEST: Position = new Position(-1, 0);
    public static EAST: Position = new Position(1, 0);
    public static NORTH_WEST: Position = new Position(0, -1);
    public static NORTH_EAST: Position = new Position(1, -1);
    public static SOUTH_WEST: Position = new Position(-1, 1);
    public static SOUTH_EAST: Position = new Position(0, 1);

    public static BASE_DIRECTIONS = [Position.WEST, Position.EAST, Position.NORTH_WEST, Position.NORTH_EAST, Position.SOUTH_WEST, Position.SOUTH_EAST];
}
