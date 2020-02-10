import * as PIXI from 'pixi.js';
import { xIndex2XPosi, yIndex2YPosi } from '../map/utils';
import { Game } from '../gameState';

export interface IMonster {
  sprite: PIXI.Sprite;
  /** y-index on board */
  readonly x: number;
  /** y-index on board */
  readonly y: number;
  setBoardPosi(x: number, y: number): void;
}

export abstract class Monster {
  sprite: PIXI.Sprite;
  x: number;
  y: number;

  constructor(x: number, y: number, spriteName: string) {
    this.x = x;
    this.y = y;
    this.sprite = PIXI.Sprite.from(spriteName);
    this.sprite.interactive = true;
    this.sprite.on("click", this.onClick.bind(this));
    this.setBoardPosi(x,y);
  }

  onClick() {
    Game.state.currentMonster = this;
  }

  setBoardPosi(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.sprite.x = xIndex2XPosi(x, y);
    this.sprite.y = yIndex2YPosi(y);
  }
}
