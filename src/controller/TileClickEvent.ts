import { GameState } from '../GameState'
import { Position } from "../viewModel/Position";
import { MonsterDict } from '../viewModel/utils/Monster';
import { SelectedMonsterChangeEvent } from './SelectedMonsterChangeEvent';
import { MonsterMoveEvent } from './MonsterMoveEvent';

export class TileClickEvent {
  static dispatch(posi: Position) {
    const clickedMonsterId = TileClickEvent.clickOnMonster(posi, GameState.monsters);
    if (clickedMonsterId !== -1) {
      SelectedMonsterChangeEvent.dispatch(clickedMonsterId);
      return;
    }

    const selectedMonster = GameState.monsters[GameState.selectedMonster];
    MonsterMoveEvent.dispatch(selectedMonster.id, posi);
  }

  private static clickOnMonster(clickPosi: Position, monsters: MonsterDict) {
    for (let [monsterId, monster] of Object.entries(monsters)) {
      if (clickPosi.isEqual(monster.position)) {
        return parseInt(monsterId);
      }
    }

    return -1;
  }
}