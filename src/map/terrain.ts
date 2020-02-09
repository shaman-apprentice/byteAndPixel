import * as PIXI from 'pixi.js';

import { Game } from '../gameState';
import { yIndex2YPosi, xIndex2XPosi, isAdjacent} from './utils';

export const types: {[key: string]: string} = {
  earth: 'Earth.png',
  fire: 'Fire.png',
  ice: 'Ice.png',
  nature: 'Nature.png', // todo tk: to be replaced through 'tech'?
};

export class Terrain {
  public sprite: PIXI.Sprite;
  /** x-index on board */
  private x: number;
  /** y-index on board */
  private y: number;

  constructor(type: string, x: number, y: number) {
    this.x = x;
    this.y = y;

    this.sprite = PIXI.Sprite.from('Assets/Images/Terrain/' + type);
    this.sprite.x = xIndex2XPosi(x, y);
    this.sprite.y = yIndex2YPosi(y);
    this.sprite.interactive = true;
    this.sprite.on('click', () => {
      const dummymon = Game.state.dummymon;
      if (isAdjacent(dummymon.x, dummymon.y, this.x, this.y))
        Game.state.dummymon.setBoardPosi(this.x, this.y);
      else
        alert('dude, chill...');
    });
  }
}
