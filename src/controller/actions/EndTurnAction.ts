import { GameState } from '../../GameState'
import { Action } from './Action';
import { enemyAction } from '../../viewModel/utils/ai';

export class EndTurnAction extends Action {

  protected doAction() {
    GameState.turn += 1;
    
    GameState.monsters.getValues().filter(monster => !monster.friendly).forEach(enemy => {
      while(enemy.actionPoints.current > 0) {
        enemyAction(enemy);
      }
    })

    GameState.monsters.getValues().forEach(monster => {
      monster.actionPoints.setToMax();
    });
  }

  canExecute() : boolean {
    return true;
  }

  constructor() {
    super();
  }

}