import { Tile } from "./tile";

export class TileMap {
    
    tiles: Tile[][];

	constructor(tiles: Tile[][]) {
		this.tiles = tiles;
    }
}