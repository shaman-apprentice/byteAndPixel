import * as PIXI from 'pixi.js';

import { gameState } from '../gameState';

export enum Type {
  earth = 'Earth.png',
  fire = 'Fire.png',
  ice = 'Ice.png',
  nature = 'Nature.png', // todo tk: to be replaced through 'tech'?
}

const terrainWidth = 64;
const terrainHeight = 80;

export class Terrain {
  public sprite: PIXI.Sprite;
  /** x-index on board */
  private x: number;
  /** y-index on board */
  private y: number;

  constructor(type: Type, x: number, y: number) {
    this.x = x;
    this.y = y;

    this.sprite = PIXI.Sprite.from('Assets/Images/Terrain/' + Type[type]);
    this.sprite.x = xIndex2XPosi(x, y);
    this.sprite.y = yIndex2YPosi(y);
    this.sprite.interactive = true;
    this.sprite.on('click', () => {
      gameState.dummymon.setBoardPosi(this.x, this.y);
    });
  }
}

export const yIndex2YPosi = (y: number) =>
  y * terrainHeight + (y === 0 ? 0 : -15 * y);
export const xIndex2XPosi = (x: number, y: number) =>
  x * terrainWidth + (y % 2 === 0 ? terrainWidth / 2 : 0);
