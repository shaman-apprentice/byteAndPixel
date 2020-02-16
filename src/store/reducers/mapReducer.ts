import { isAdjacent } from '../../model/map'
import { GameState } from '../../model/gameState';
import { TILE_CLICK } from '../actions/mapAction'

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
  if (isAdjacent(selectedMonster.position, action.position)) {
    selectedMonster.position = action.position;
  }

  return state;
}
