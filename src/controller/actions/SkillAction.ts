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

  constructor(attackingMonster: Monster, target: Position, skill: Skill) {
    super();
    this.attackingMonster = attackingMonster;
    this.target = target;
    this.skill = skill;
    this.targetProgress = 10;
    this.progress = 0;
  }

  animate(delta: number) {
    this.progress += delta;
    this.skill.animation?.animate(this.attackingMonster, this.target, this.progress / this.targetProgress)
  }

  finished() {
    return this.progress >= this.targetProgress;
  }


}
