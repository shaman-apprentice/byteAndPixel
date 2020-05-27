import { GameState } from '../../GameState'
import { Action } from './Action';
import { Monster } from 'viewModel/Monster';
import { Enemy } from 'viewModel/enemy/enemy';
import { Position } from "../../viewModel/Position";

export class EndTurnAction extends Action {

  protected doAction() {
    GameState.turn += 1;

    GameState.monsters.getValues().filter(monster => monster instanceof Enemy).map(monster => monster as Enemy).forEach(enemy => {
      while (enemy.actionPoints.current > 0) {
        enemy.aiAction();
      }
    })

    GameState.monsters.getValues().forEach(monster => {
      if (GameState.turn - monster.lastFight > 2) {
        monster.hitPoints.add(1);
      }
      this.handlehappiness(monster);
      monster.actionPoints.setToMax();
    });
  }

  private handlehappiness(monster: Monster) {
    const elementalNeighborhood = GameState.map.getElementsInNeighborhood(monster.position);
    const unsatisfied = monster.elements.sub(elementalNeighborhood).magnitude()
    if (unsatisfied > 0) {
      monster.happiness.current -= unsatisfied;
    } else {
      monster.happiness.current += 2;
    }
  }

  canExecute(): boolean {
    return true;
  }

  constructor() {
    super();
  }

  target(): Position {
    return new Position(0,0);
  }
  type(): String {
    return "endTurn"
  }

}