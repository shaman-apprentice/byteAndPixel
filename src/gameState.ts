import * as PIXI from 'pixi.js';
import { Board } from './map/board';
import { Dummymon } from './monsters/dummymon';
import { Monster } from './monsters/Monster';


export interface GameState {
  boardData: Board;
  boardContainer: PIXI.Container;
  monsters: Monster[];
  currentMonster: Monster;
}

export class Game {
  private static _state: undefined | GameState;

  public static get state(): GameState {
    if (!Game._state){
      let dummymon = new Dummymon(0,0);
      Game._state = {
        boardData: new Board(),
        boardContainer: new PIXI.Container(),
        monsters: [dummymon, new Dummymon(2,3)],
        currentMonster: dummymon
      };}

    return Game._state;
  }
}
