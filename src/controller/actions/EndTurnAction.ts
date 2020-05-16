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
      this.handleHappyness(monster);
      monster.actionPoints.setToMax();
    });
  }

  private handleHappyness(monster: Monster) {
    const elementalNeighborhood = GameState.map.getElementsInNeighborhod(monster.position);
    const unsatisfied = monster.elements.sub(elementalNeighborhood).magnitude()
    if (unsatisfied > 0) {
      monster.happyness.current -= unsatisfied;
    } else {
      monster.happyness.current += 2;
    }
  }

  canExecute(): boolean {
    return true;
  }

  constructor() {
    super();
  }

}