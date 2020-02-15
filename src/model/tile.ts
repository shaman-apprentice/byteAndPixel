import { Position } from "./position";

export enum TerrainType {
    Earth = "Earth",
    Fire = "Fire",
    Ice = "Ice",
    Nature = "Nature",
} 

export interface Tile {
    position: Position;
    terrainType: TerrainType;
}
