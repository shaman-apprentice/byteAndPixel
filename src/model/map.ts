import { Tile } from "./tile";

export class TileMap {
    
    private _tiles: Tile[][];

	constructor(tiles: Tile[][]) {
		this._tiles = tiles;
    }
    
    public get tiles() {
        return this._tiles;
    }
}