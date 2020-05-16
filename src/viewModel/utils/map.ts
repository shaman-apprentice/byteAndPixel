import { Position } from "../../viewModel/Position";
import { HashMap } from "utils/HashMap";
import { ElementSignature, Element } from "./Element";

class TerrainType {
    elements: ElementSignature;
    name: string;
}

const terrains = [
    {name: 'earth', elements: new ElementSignature(1,0,0,0,0)},
    {name: 'fire', elements: new ElementSignature(0,1,0,0,0)},
    {name: 'ice', elements: new ElementSignature(0,0,1,0,0)},
    {name: 'nature', elements: new ElementSignature(0,0,0,1,0)},
    {name: 'metal', elements: new ElementSignature(0,0,0,0,1)},
]

export const createMapData = (size: number): HashMap<Position, TileData> => {
    let map: HashMap<Position, TileData> = new HashMap(Position.toString);
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            const position = new Position(x,y);
            const terrainType = randomTerrainType();
            map.set(position, {elements: terrainType.elements, name: terrainType.name, position: position, slimed: x + y >= 7})
        }
    }
    return map;
}

export const isAdjacent = (a: Position, b: Position): boolean => {
    const vector = a.difference(b)
    const base = baseDirections.find(v => vector.isEqual(v));

    return Boolean(base);
}

const toCubeCoords = (pos: Position): [number, number, number] => {
    return [pos.x, -(pos.x + pos.y), pos.y];
}

export const distance = (a: Position, b: Position): number => {
    const [ax, ay, az] = toCubeCoords(a);
    const [bx, by, bz] = toCubeCoords(b);

    return Math.max(Math.abs(ax - bx), Math.abs(ay - by), Math.abs(az - bz));
}

export const firstStep = (from: Position, to: Position): Position => {
    const delta = to.difference(from);
    if (delta.isEqual(stay)) { return stay; }

    const [x, y, z] = toCubeCoords(delta);
    const [yx, zy, xz] = [y-x, z-y, x-z];

    if (Math.abs(xz) >= Math.abs(zy) && Math.abs(xz) >= Math.abs(yx)) {
        return xz > 0 ? northEast : southWest;
    } else if (Math.abs(zy) >= Math.abs(xz) && Math.abs(zy) >= Math.abs(yx)) {
        return zy > 0 ? southEast : northWest;
    } else {
        return yx > 0 ? west : east;
    }
}

const stay: Position = new Position(0, 0);
const west: Position = new Position(-1, 0);
const east: Position = new Position(1, 0);
const northWest: Position = new Position(0, -1);
const northEast: Position = new Position(1, -1);
const southWest: Position = new Position(-1, 1);
const southEast: Position = new Position(0, 1);

const baseDirections = [west, east, northWest, northEast, southWest, southEast];

const randomTerrainType = (): TerrainType => {
    const index = Math.floor(Math.random() * 4);
    return terrains[index];
}

export interface TileData {
    name: string;
    elements: ElementSignature;
    position: Position;
    slimed: boolean;
}
