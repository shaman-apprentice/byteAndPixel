import { Position } from "../../viewModel/Position";
import { Action } from "./Action";
import { Monster } from "../../viewModel/Monster";
import { Skill } from "controller/skills/Skill";

export class SkillAction extends Action {

  attackingMonster: Monster;
  target: Position;
  skill: Skill;

  async doAction() {
    this.skill.cost.pay(this.attackingMonster);
    await this.skill.animation?.animate(this.attackingMonster, this.target);
    this.skill.effect.applyEffect(this.attackingMonster, this.target);
  }

  canExecute() {
    return this.attackingMonster 
    && this.skill.target.validTarget(this.attackingMonster, this.target) 
    && this.skill.cost.canPay(this.attackingMonster);
  }

  constructor(attackingMonster: Monster, target: Position, skill: Skill) {
    super();
    this.attackingMonster = attackingMonster;
    this.target = target;
    this.skill = skill;
    this.targetProgress = skill.animation?.frames ?? 0;
    this.progress = 0;
  }

}
