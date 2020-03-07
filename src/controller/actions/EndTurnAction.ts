import { GameState } from '../../GameState'
import { Action } from './Action';
import { enemyAction } from '../../viewModel/utils/ai';

export class EndTurnAction extends Action {

  protected doAction() {
    GameState.turn += 1;

    Object.values(GameState.monsters).filter(monster => !monster.friendly).forEach(enemy => {
      while(enemy.actionPoints > 0) {
        enemyAction(enemy);
      }
    })

    Object.values(GameState.monsters).forEach(monster => {
      monster.actionPoints = 2;
    });
  }

  canExecute() : boolean {
    return true;
  }

  constructor() {
    super();
  }

}