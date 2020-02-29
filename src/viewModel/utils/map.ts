import { Position } from "../../viewModel/Position";

export enum TerrainType {
    Earth = "Earth",
    Fire = "Fire",
    Ice = "Ice",
    Nature = "Nature",
} 

export type MapData = TileData[][];

export const createMapData = (size: number): MapData => {
    let map: MapData = [];
    for (let x = 0; x < size; x++) {
        const row: TileData[] = [];
        for (let y = 0; y < size; y++) {
            row.push({
                terrainType: randomTerrainType(),
                position: new Position(x, y),
                slimed: x+y >= 7
            });
        }
        map.push(row);
    }
    return map;
}

export const isAdjacent = (a: Position, b: Position): boolean => {
    const vector = a.difference(b)
    const base = baseDirections.find(v => vector.isEqual(v));

    return Boolean(base);
}

const west: Position = new Position(1,0);
const east: Position = new Position(-1,0);
const northWest: Position = new Position(1,-1);
const northEast: Position = new Position(0,-1);
const southWest: Position = new Position(0,1);
const southEast: Position = new Position(-1,-1);

const baseDirections = [west, east, northWest, northEast, southWest, southEast];

const randomTerrainType = (): TerrainType => {
    const terrainTypes = Object.keys(TerrainType);
    const index = Math.floor(Math.random() * terrainTypes.length);
    return terrainTypes[index] as TerrainType;
}

export interface TileData {
    position: Position;
    terrainType: TerrainType;
    slimed: boolean;
}
