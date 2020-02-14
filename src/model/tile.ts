import { Point } from "./position";

export enum TerrainType {
    Earth = "Earth",
    Fire = "Fire",
    Ice = "Ice",
    Nature = "Nature",
}

export class Tile {
    private _terrainType: TerrainType;
    private _position: Point;

	constructor(terrainType: TerrainType, position: Point) {
		this._terrainType = terrainType;
		this._position = position;
    }
    
    get terrainType(): TerrainType {
        return this._terrainType
    }

    get position(): Point {
        return this._position
    }

    change(terrainType: TerrainType = this._terrainType, position: Point = this._position): Tile {
        return new Tile(terrainType, position);
    }
}