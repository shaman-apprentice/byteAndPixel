import { GameState } from '../GameState'
import { Action } from './Action';

export class EndTurnAction extends Action {

  protected doAction() {
    GameState.turn += 1;

    Object.values(GameState.monsters).forEach(monster => {
      monster.actionPoints = 2;
    });
  }

  constructor() {
    super();
  }

}