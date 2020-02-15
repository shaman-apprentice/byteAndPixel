import { Position } from "../position";

export const MOVE = 'MOVE';
export const END_TURN = "END_TURN";
export const SELECT_MONSTER = "SELECT_MONSTER";

export function createMoveAction(to: Position) {
    return {
        type: MOVE,
        to: to
    }
}

export function createEndTurnAction() {
    return {
        type: END_TURN,
    }
}

export function createSelectMonsterAction(index: number) {
    return {
        type: SELECT_MONSTER,
        index: index
    }
}