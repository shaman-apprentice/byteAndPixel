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

	constructor(name: TerrainType, position: Point) {
		this._terrainType = name;
		this._position = position;
	}

    public get terrainType() {
        return this._terrainType
    }

    public get position() {
        return this._position;
    }
}