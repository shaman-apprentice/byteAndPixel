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
    const {x: x1, y: y1} = a;
    const {x: x2, y: y2} = b;

    const neighbors = [
        [x1+1, y1],
        [x1-1, y1],
        [x1, y1+1],
        [x1, y1-1],
        [x1+1, y1-1],
        [x1-1, y1+1],
    ];
    const neighbor = neighbors.find(([x, y]) => x === x2 && y === y2);
    return Boolean(neighbor);
}

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
