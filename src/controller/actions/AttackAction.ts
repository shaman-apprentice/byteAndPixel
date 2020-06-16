import { GameState } from "../../GameState";
import { Position } from "../../viewModel/Position";
import { isAdjacent } from "../../viewModel/utils/map";
import { Action } from "./Action";
import { monsterAtPosition } from "../../viewModel/utils/monster";
import { Monster } from "../../viewModel/Monster";
import {Skill} from "../../viewModel/Skill";

export class AttackAction extends Action {

  attackingMonster: Monster;
  targetMonster: Monster;

  doAction() {
    const l = this.attackingMonster.skillList.length;
    if(l != 0){
      const skill = this.attackingMonster.skillList[l-1];
      this.targetMonster.hitPoints.sub(skill.damage);
      this.attackingMonster.actionPoints.sub(skill.cost);
      this.targetMonster.lastFight = GameState.turn;
      this.targetMonster.lastFight = GameState.turn;
      
    }
    else{
      this.targetMonster.hitPoints.sub(1);
      this.attackingMonster.actionPoints.sub(1);
      this.targetMonster.lastFight = GameState.turn;
      this.targetMonster.lastFight = GameState.turn;
    }
    
    if (this.targetMonster.hitPoints.current <= 0) {
      GameState.removeMonster(this.targetMonster);
    }
  }

  canExecute() {
    return this.attackingMonster
      && this.targetMonster
      && this.attackingMonster.actionPoints.current >= 1
      && isAdjacent(this.attackingMonster.position, this.targetMonster.position)
      && this.attackingMonster.friendly != this.targetMonster.friendly;
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
