import { isAdjacent } from '../../model/map'
import { GameState } from '../../model/gameState';
import { TILE_CLICK } from '../actions/mapAction'
import { Monster } from '../../model/monster';
import { Position } from '../../model/position';

export const onTileClickReducer = (state: GameState, action: any) => {
  if (action.type !== TILE_CLICK) 
    return state;

  for (let [monsterId, monster] of Object.entries(state.monsters)) {
    if (monster.position.x === action.position.x && monster.position.y === action.position.y) {
      state.selectedMonster = parseInt(monsterId);
      return state;
    }
  }

  const selectedMonster = state.monsters[state.selectedMonster];
  moveMonster(selectedMonster, action.position);

  return state;
}

/** returns false, if the monster did not move, true otherwise */
function moveMonster(m: Monster, p: Position): boolean {
  if (m.actionPoints <= 0 || !isAdjacent(m.position, p))
    return false;

  m.position = p;
  m.actionPoints -= 1;
  return true;
}
