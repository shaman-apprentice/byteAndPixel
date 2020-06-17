import { GameState } from "../../GameState";
import { Position } from "../../viewModel/Position";
import { firstStep } from "../../viewModel/utils/map";
import { Action } from "./Action";
import { monsterIdAtPosition } from "../../viewModel/utils/monster";
import { Monster } from "../../viewModel/Monster";
import { isAdjacent } from "../../viewModel/utils/map";
import { Skills } from "viewModel/utils/skills";

export class MoveAction extends Action {
  monster: Monster;
  targetPosition: Position;

  doAction() {
    this.monster.actionPoints.sub(1);
    this.monster.position = this.targetPosition;
    //TODO: learning of skill should be moved to a better place
    //learn basic skill depending on tile
    const tileEle = GameState.map.tiles.get(this.targetPosition).elementSignature;
    const delta = tileEle.sub(this.monster.elements);
    if(delta.magnitude() == 0){
        this.monster.learnSkill(Skills.baseSkills.get(tileEle.getElement()));
    }
  }

  canExecute(): boolean {
    return this.monster
      && isAdjacent(this.monster.position, this.targetPosition)
      && this.monster.actionPoints.current >= 1
      && this.canEnter(this.targetPosition, this.monster)
  }

  canEnter(position: Position, monster: Monster): boolean {
    const correctSlimeState = GameState.map.tiles.get(position).slimed == !monster.friendly;
    const containsMonster = monsterIdAtPosition(position) != -1;
    return correctSlimeState && !containsMonster;
  }

  constructor(monsterId: number, position: Position) {
    super();
    this.monster = GameState.monsters.get(monsterId);
    this.targetPosition = this.monster.position.add(firstStep(this.monster.position, position));
  }

  target(): Position {
    return this.targetPosition;
  }
  type(): String {
    return "walk";
  }
}

