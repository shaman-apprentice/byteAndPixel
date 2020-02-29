import { GameState } from "../GameState";
import { Position } from "../viewModel/Position";
import { isAdjacent, firstStep } from "../viewModel/utils/map";
import { Action } from "./Action";
import { monsterAtPosition } from "../viewModel/utils/monster";
import { Monster } from "../viewModel/Monster";

export class MonsterMoveAction extends Action {
  monsterId: number;
  position: Position

  doAction() {
    const monster = GameState.monsters[this.monsterId];

    if (monster.actionPoints <= 0)
        return;

    const delta = firstStep(monster.position, this.position);
    const targetPosition =  monster.position.add(delta);

    if (this.canEnter(targetPosition, monster)) {
      monster.position = targetPosition;
      monster.actionPoints -= 1;
    }

  }

  canEnter(position: Position, monster: Monster): boolean {
    const correctSlimeState = GameState.map.tiles[position.x][position.y].slimed == !monster.friendly;
    const containsMonster = monsterAtPosition(position) != -1;
    return correctSlimeState && !containsMonster;
  }

  constructor(monsterId: number, position: Position) {
    super();
    this.monsterId = monsterId;
    this.position = position;
  }
}
