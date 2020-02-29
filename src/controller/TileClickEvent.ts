import { GameState } from '../GameState'
import { Position } from "../viewModel/Position";
import { MonsterDict } from '../viewModel/utils/monster';
import { SelectedMonsterChangeAction } from './SelectedMonsterChangeAction';
import { MonsterMoveAction } from './MonsterMoveAction';
import { Action } from './Action';
import { ChangeTileSlimeAction as ChangeTileSlimeAction } from './ChangeTileSlimeAction';
import { isAdjacent } from '../viewModel/utils/map';
import { monsterAtPosition } from '../viewModel/utils/monster';

export class TileClickAction extends Action {
  position: Position;

  doAction() {
    const clickedMonsterId = monsterAtPosition(this.position);

    if (clickedMonsterId !== -1) {
      new SelectedMonsterChangeAction(clickedMonsterId).execute();
      return;
    }

    const selectedMonster = GameState.monsters[GameState.selectedMonster];
    const selectedTile = GameState.map.tiles[this.position.x][this.position.y];
    if (isAdjacent(this.position, selectedMonster.position) && selectedTile.slimed) {
      new ChangeTileSlimeAction(GameState.selectedMonster, this.position, false).execute();
    } else {
      new MonsterMoveAction(selectedMonster.id, this.position).execute();
    }

  }

  constructor(position: Position) {
    super();
    this.position = position;
  }
}