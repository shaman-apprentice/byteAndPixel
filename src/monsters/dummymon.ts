import * as PIXI from 'pixi.js';

import { xIndex2XPosi, yIndex2YPosi } from '../map/terrain';

import { IMonster } from './IMonster';

export class Dummymon implements IMonster {
  public sprite;
  public x: number;
  public y: number;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = PIXI.Sprite.from('Assets/Images/Dummymon.png');
    this.sprite.x = xIndex2XPosi(x, y);
    this.sprite.y = yIndex2YPosi(y);
  }
}
