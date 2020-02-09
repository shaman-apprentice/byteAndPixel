import { Board } from './map/board';
import { Dummymon } from './monsters/dummymon';

export interface GameState {
  board: Board;
  dummymon: Dummymon;
}

export class Game {
  private static _state: undefined | GameState;

  public static get state(): GameState {
    if (!Game._state)
      Game._state = {
        board: new Board(),
        dummymon: new Dummymon(0, 0),
      };
    
    return Game._state;
  }
}
