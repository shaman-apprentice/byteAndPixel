import { GameState } from '../GameState'
import { Position } from "../viewModel/Position";
import { MonsterDict } from '../viewModel/utils/monster';
import { SelectedMonsterChangeAction } from './SelectedMonsterChangeAction';
import { MonsterMoveAction } from './MonsterMoveAction';
import { Action } from './Action';

export class TileClickAction extends Action {
  position: Position;

  execute() {
    const clickedMonsterId = this.clickOnMonster(this.position, GameState.monsters);
    
    if (clickedMonsterId !== -1) {
      new SelectedMonsterChangeAction(clickedMonsterId).doExecute();
      return;
    }

    const selectedMonster = GameState.monsters[GameState.selectedMonster];
    new MonsterMoveAction(selectedMonster.id, this.position).doExecute();
  }

  private clickOnMonster(clickPosi: Position, monsters: MonsterDict) {
    for (let [monsterId, monster] of Object.entries(monsters)) {
      if (clickPosi.isEqual(monster.position)) {
        return parseInt(monsterId);
      }
    }

    return -1;
  }

  constructor(position: Position) {
    super();
    this.position = position;
  }
}