import { Position } from '../../model/position'

export const MOVE_MONSTER = 'MOVE_MONSTER';
export const SELECT_MONSTER = "SELECT_MONSTER";

export const createMoveMonsterAction = (monsterId: number, position: Position) => ({
  type: MOVE_MONSTER,
  monsterId,
  position,
});

export const createSelectMonsterAction = (monsterId: number) => ({
  type: SELECT_MONSTER,
  monsterId,
});
