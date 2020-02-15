import { Point } from "./position";

export enum TerrainType {
    Earth = "Earth",
    Fire = "Fire",
    Ice = "Ice",
    Nature = "Nature",
} 

export interface Tile {
    position: Point;
    terrainType: TerrainType;
}
