import { GameState } from "../../GameState";
import { Position } from "../../viewModel/Position";
import { Action } from "./Action";
import { Monster } from "../../viewModel/Monster";
import { Skill } from "controller/skills/Skill";

export class SkillAction extends Action {

  attackingMonster: Monster;
  target: Position;
  skill: Skill;

  doAction() {
    this.skill.cost.pay(this.attackingMonster);
    this.skill.effect.applyEffect(this.attackingMonster, this.target);
  }

  canExecute() {
    return this.attackingMonster 
    && this.skill.target.validTarget(this.attackingMonster, this.target) 
    && this.skill.cost.canPay(this.attackingMonster);
  }

  constructor(attackerId: number, target: Position, skill: Skill) {
    super();
    this.attackingMonster = GameState.monsters.get(attackerId);
    this.target = target;
    this.skill = skill;
  }
}
