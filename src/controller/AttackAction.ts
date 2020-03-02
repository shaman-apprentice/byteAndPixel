import { GameState } from "../GameState";
import { Position } from "../viewModel/Position";
import { isAdjacent } from "../viewModel/utils/map";
import { Action } from "./Action";
import { monsterAtPosition } from "../viewModel/utils/monster";

export class AttackAction extends Action {
  attackerId: number;
  target: Position

  doAction() {
    const attackingMonster = GameState.monsters[this.attackerId];
    const targetMonster = GameState.monsters[monsterAtPosition(this.target)];

    if (!isAdjacent(attackingMonster.position, targetMonster.position) || attackingMonster.actionPoints <= 0 || attackingMonster.friendly == targetMonster.friendly)
      return;
    
    targetMonster.hitPoints -= 1;
    attackingMonster.actionPoints -= 1;
    console.log(targetMonster.hitPoints);
  }


  constructor(attackerId: number, target: Position) {
    super();
    this.attackerId = attackerId;
    this.target = target;
  }
}
