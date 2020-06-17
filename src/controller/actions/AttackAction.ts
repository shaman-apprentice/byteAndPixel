import { GameState } from "../../GameState";
import { Position } from "../../viewModel/Position";
import { isAdjacent } from "../../viewModel/utils/map";
import { Action } from "./Action";
import { monsterAtPosition } from "../../viewModel/utils/monster";
import { Monster } from "../../viewModel/Monster";
import { Skill } from "controller/skills/Skill";

export class AttackAction extends Action {

  attackingMonster: Monster;
  targetMonster: Monster;

  doAction() {
    const skill = this.currentSkill();
    this.targetMonster.hitPoints.sub(skill.damage);
    skill.cost.pay(this.attackingMonster);
    this.targetMonster.lastFight = GameState.turn;
    this.targetMonster.lastFight = GameState.turn;

    if (this.targetMonster.hitPoints.current <= 0) {
      GameState.removeMonster(this.targetMonster);
    }
  }

  canExecute() {
    return this.attackingMonster
      && this.targetMonster
      && this.currentSkill().cost.canPay(this.attackingMonster)
      && isAdjacent(this.attackingMonster.position, this.targetMonster.position)
      && this.attackingMonster.friendly != this.targetMonster.friendly;
  }

  private currentSkill(): Skill {
    return this.attackingMonster.skillList[this.attackingMonster.skillList.length - 1];
  }

  constructor(attackerId: number, target: Position) {
    super();
    this.attackingMonster = GameState.monsters.get(attackerId);
    this.targetMonster = monsterAtPosition(target);
  }

  target(): Position {
    return this.targetMonster.position;
  }

  type(): String {
    return "attack";
  }
}
