import { Tile } from "./tile";

export class TileMap {
    
    private _tiles: Tile[][];

	constructor(tiles: Tile[][]) {
		this._tiles = tiles;
    }

    get tiles() : Tile[][] {
        return this._tiles
    }

    changeTileAt(x: number, y: number, tile: Tile) {
        let copiedTiles = this._tiles.slice()
        copiedTiles[x][y] = tile;
        new TileMap(copiedTiles);
    }
}