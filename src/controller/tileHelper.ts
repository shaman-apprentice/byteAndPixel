import { Point } from "../model/position";

export function isAdjacent(a: Point, b: Point): boolean {
    let {x: x1,y: y1} = a;
    let {x: x2,y: y2} = b;

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