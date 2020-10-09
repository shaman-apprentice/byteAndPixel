export const tileSize: number = 64;
export const displayTileSizeX: number = tileSize;
export const displayTileSizeY: number = tileSize * 0.75;

export class TilePosition {
    constructor(public x: number, public y: number) { }

    static toString(p: TilePosition) {
        return `${p.x}-${p.y}`;
    }

    isEqual(other: TilePosition) {
        return this.x === other.x && this.y === other.y;
    }

    toDisplayCoords(): { x: number, y: number } {
        return {
            x: this.x * displayTileSizeX + this.y * displayTileSizeX / 2,
            y: this.y * displayTileSizeY,
        }
    }

    add(other: TilePosition): TilePosition {
        return new TilePosition(this.x + other.x, this.y + other.y);
    }

    difference(other: TilePosition): TilePosition {
        return new TilePosition(this.x - other.x, this.y - other.y);
    }

    deepClone() {
        return new TilePosition(this.x, this.y);
    }

    public static STAY: TilePosition = new TilePosition(0, 0);
    public static WEST: TilePosition = new TilePosition(-1, 0);
    public static EAST: TilePosition = new TilePosition(1, 0);
    public static NORTH_WEST: TilePosition = new TilePosition(0, -1);
    public static NORTH_EAST: TilePosition = new TilePosition(1, -1);
    public static SOUTH_WEST: TilePosition = new TilePosition(-1, 1);
    public static SOUTH_EAST: TilePosition = new TilePosition(0, 1);

    public static BASE_DIRECTIONS = [TilePosition.WEST, TilePosition.EAST, TilePosition.NORTH_WEST, TilePosition.NORTH_EAST, TilePosition.SOUTH_WEST, TilePosition.SOUTH_EAST];
}
