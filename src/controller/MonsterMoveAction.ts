import { GameState } from "../GameState";
import { Position } from "../viewModel/Position";
import { isAdjacent } from "../viewModel/utils/map";
import { Action } from "./Action";

export class MonsterMoveAction extends Action {
  monsterId: number;
  position: Position

  execute() {
    const monster = GameState.monsters[this.monsterId];

    if (monster.actionPoints <= 0 || !isAdjacent(monster.position, this.position))
        return;

    monster.position = this.position;
    monster.actionPoints -= 1;
  }

  constructor(monsterId: number, position: Position) {
    super();
    this.monsterId = monsterId;
    this.position = position;
  }
}
