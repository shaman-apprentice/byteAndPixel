import * as PIXI from 'pixi.js';

export enum Type {
  earth = 'Earth.png',
  fire = 'Fire.png',
  ice = 'Ice.png',
  nature = 'Nature.png' // todo tk: to be replaced through 'tech'?
}

export const terrainWidth = 64;
export const terrainHeight = 80;

export class Terrain {
  public type: Type;
  public sprite: PIXI.Sprite;

  constructor(type: Type, x: number, y: number) {
    this.type = type;
    this.sprite = PIXI.Sprite.from('Assets/Images/Terrain/' + Type[type]);
    this.sprite.x = x;
    this.sprite.y = y;
  }
}
