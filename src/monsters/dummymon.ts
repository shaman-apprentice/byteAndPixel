import * as PIXI from 'pixi.js';

import { xIndex2XPosi, yIndex2YPosi } from '../map/terrain';

import { IMonster } from './IMonster';

export class Dummymon implements IMonster {
  public sprite: PIXI.Sprite;
  private _x: number;
  private _y: number;

  constructor(x, y) {
    this.sprite = PIXI.Sprite.from('Assets/Images/Dummymon.png');
    this.setBoardPosi(x, y);
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  setBoardPosi(x: number, y: number) {
    this._x = x;
    this._y = y;
    this.sprite.x = xIndex2XPosi(x, y);
    this.sprite.y = yIndex2YPosi(y);
  }
}
