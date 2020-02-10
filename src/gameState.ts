import * as PIXI from 'pixi.js';

import { Board } from './map/board';
import { Dummymon } from './monsters/dummymon';

export interface GameState {
  boardData: Board;
  boardContainer: PIXI.Container;
  dummymon: Dummymon;
}

export class Game {
  private static _state: undefined | GameState;

  public static get state(): GameState {
    if (!Game._state)
      Game._state = {
        boardData: new Board(),
        boardContainer: new PIXI.Container(),
        dummymon: new Dummymon(0, 0),
      };

    return Game._state;
  }
}
