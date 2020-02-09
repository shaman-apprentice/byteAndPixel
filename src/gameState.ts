import { Board } from './map/board';
import { Dummymon } from './monsters/dummymon';

export const gameState = {
  board: new Board(),
  dummymon: new Dummymon(0, 0),
};
