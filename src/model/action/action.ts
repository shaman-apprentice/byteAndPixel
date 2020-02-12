import { Point } from "../position";

export const MOVE = 'MOVE'

interface MoveAction {
    type: typeof MOVE;
    to: Point
}

export function createMoveAction(to: Point): MoveAction {
    return {
        type: MOVE,
        to: to
    }
}