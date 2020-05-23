import { GameState } from '../../GameState'
import { Action } from './Action';
import { enemyAction } from '../../viewModel/utils/ai';
import { Monster } from 'viewModel/Monster';

export class EndTurnAction extends Action {

  protected doAction() {
    GameState.turn += 1;

    GameState.monsters.getValues().filter(monster => !monster.friendly).forEach(enemy => {
      while (enemy.actionPoints.current > 0) {
        enemyAction(enemy);
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
    const elementalNeighborhood = GameState.map.getElementsInNeighborhod(monster.position);
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

}