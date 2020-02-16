import * as PIXI from 'pixi.js'

import { store, getSelectedMonster } from '../store/store'

export class SelectionView {
  sprite: PIXI.Sprite;

  constructor() {
    this.sprite = this.initSprite();
    this.markSelectedMonster();
    store.subscribe(() => {
      this.markSelectedMonster();
    });
  }

  private initSprite() {
    const sprite = PIXI.Sprite.from("Assets/Images/SelectionCircle.png");
    sprite.anchor.set(0.5, 0.5);
    return sprite;
  }

  private markSelectedMonster() {
    const dc = getSelectedMonster().position.toDisplayCoords();
    this.sprite.position.set(dc.x, dc.y);
  }
}