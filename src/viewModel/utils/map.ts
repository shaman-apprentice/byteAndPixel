import { HashMap } from "utils/HashMap";
import { ElementSignature } from "./Element";
import { TilePosition } from "model/TilePosition";

class TerrainType {
    elements: ElementSignature;
    name: string;
}

const terrainTypes = [
    { name: 'earth', elements: new ElementSignature(1, 0, 0, 0, 0) },
    { name: 'fire', elements: new ElementSignature(0, 1, 0, 0, 0) },
    { name: 'ice', elements: new ElementSignature(0, 0, 1, 0, 0) },
    { name: 'nature', elements: new ElementSignature(0, 0, 0, 1, 0) },
    { name: 'metal', elements: new ElementSignature(0, 0, 0, 0, 1) },
]

export const createMapData = (size: number): HashMap<TilePosition, TileData> => {
    let map: HashMap<TilePosition, TileData> = new HashMap(TilePosition.toString);
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            const position = new TilePosition(x, y);
            const terrainType = randomTerrainType();
            map.set(position, { elements: terrainType.elements, name: terrainType.name, position: position, slimed: x + y >= 7 })
        }
    }
    return map;
}

export const isAdjacent = (a: TilePosition, b: TilePosition): boolean => {
    const vector = a.difference(b)
    const base = TilePosition.BASE_DIRECTIONS.find(v => vector.isEqual(v));

    return Boolean(base);
}

export const neighbors = (a: TilePosition): TilePosition[] => {
    return TilePosition.BASE_DIRECTIONS.map(delta => a.add(delta));
}

const toCubeCoords = (pos: TilePosition): [number, number, number] => {
    return [pos.x, -(pos.x + pos.y), pos.y];
}

export const distance = (a: TilePosition, b: TilePosition): number => {
    const [ax, ay, az] = toCubeCoords(a);
    const [bx, by, bz] = toCubeCoords(b);

    return Math.max(Math.abs(ax - bx), Math.abs(ay - by), Math.abs(az - bz));
}

export const firstStep = (from: TilePosition, to: TilePosition): TilePosition => {
    const delta = to.difference(from);
    if (delta.isEqual(TilePosition.STAY)) { return TilePosition.STAY; }

    const [x, y, z] = toCubeCoords(delta);
    const [yx, zy, xz] = [y - x, z - y, x - z];

    if (Math.abs(xz) >= Math.abs(zy) && Math.abs(xz) >= Math.abs(yx)) {
        return xz > 0 ? TilePosition.NORTH_EAST : TilePosition.SOUTH_WEST;
    } else if (Math.abs(zy) >= Math.abs(xz) && Math.abs(zy) >= Math.abs(yx)) {
        return zy > 0 ? TilePosition.SOUTH_EAST : TilePosition.NORTH_WEST;
    } else {
        return yx > 0 ? TilePosition.WEST : TilePosition.EAST;
    }
}


const randomTerrainType = (): TerrainType => {
    const index = Math.floor(Math.random() * 4);
    return terrainTypes[index];
}

export interface TileData {
    name: string;
    elements: ElementSignature;
    position: TilePosition;
    slimed: boolean;
}
