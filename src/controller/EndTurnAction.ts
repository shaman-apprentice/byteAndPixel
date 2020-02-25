import { GameState } from '../GameState'
import { Action } from './Action';

export class EndTurnAction extends Action {

  protected execute() {
    GameState.turn += 1;

    let monsters = GameState.monsters;
    for (let monster of Object.values(monsters)) {
      monster.actionPoints = 2;
    }
  }

  constructor() {
    super();
  }

}