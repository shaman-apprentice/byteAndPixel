import { GameState } from "../../GameState";
import { Position } from "../../viewModel/Position";
import { isAdjacent } from "../../viewModel/utils/map";
import { Action } from "./Action";
import { monsterAtPosition } from "../../viewModel/utils/monster";
import { Monster } from "../../viewModel/Monster";

export class AttackAction extends Action {
  attackingMonster: Monster;
  targetMonster: Monster;

  doAction() {
    this.targetMonster.hitPoints -= 1;
    this.attackingMonster.actionPoints -= 1;
  }

  canExecute() {
    return this.attackingMonster
      && this.targetMonster
      && this.attackingMonster.actionPoints >= 1
      && isAdjacent(this.attackingMonster.position, this.targetMonster.position)
      && this.attackingMonster.friendly != this.targetMonster.friendly;
  }


  constructor(attackerId: number, target: Position) {
    super();
    this.attackingMonster = GameState.monsters[attackerId];
    this.targetMonster = GameState.monsters[monsterAtPosition(target)];
  }
}
