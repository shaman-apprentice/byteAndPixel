import { Point } from "./position";

export enum TerrainType {
    Earth = "Earth",
    Fire = "Fire",
    Ice = "Ice",
    Nature = "Nature",
}

export class Tile {
    terrainType: TerrainType;
    position: Point;

	constructor(name: TerrainType, position: Point) {
		this.terrainType = name;
		this.position = position;
	}
}