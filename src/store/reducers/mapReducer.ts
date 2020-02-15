import { isAdjacent } from '../../model/map'
import { GameState } from '../../model/gameState';
import { TILE_CLICK } from '../actions/mapAction'

export const onTileClickReducer = (state: GameState, action: any) => {
  if (action.type !== TILE_CLICK) 
    return state;

  for (let [monsterId, monster] of Object.entries(state.monsters)) {
    if (monster.posi.x === action.posi.x && monster.posi.y === action.posi.y) {
      state.selectedMonster = parseInt(monsterId);
      return state;
    }
  }

  const selectedMonster = state.monsters[state.selectedMonster];
  if (isAdjacent(selectedMonster.posi, action.posi)) {
    selectedMonster.posi = action.posi;
  }

  return state;
}
