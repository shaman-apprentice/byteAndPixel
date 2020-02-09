import * as PIXI from 'pixi.js';

export interface IMonster {
  sprite: PIXI.Sprite;
  /** y-index on board */
  readonly x: number;
  /** y-index on board */
  readonly y: number;
}
