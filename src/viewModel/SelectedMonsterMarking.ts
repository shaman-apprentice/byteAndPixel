import * as PIXI from 'pixi.js'

import { GameState } from '../GameState'
import { IGuiElem } from './IGuiElem';
import { StateChangeEvent } from '../controller/StateChangeEvent';

export class SelectedMonsterMarking implements IGuiElem {
  pixiElem: PIXI.Sprite;

  constructor() {
    this.pixiElem = this.createSprite();
    this.markSelectedMonster();
    GameState.emitter.addEventListener(StateChangeEvent.type,
      () => { this.markSelectedMonster(); });
  }

  private createSprite() {
    const sprite = PIXI.Sprite.from("Assets/Images/SelectionCircle.png");
    sprite.anchor.set(0.5, 0.5);
    return sprite;
  }

  private markSelectedMonster() {
    const selectedMonster = GameState.monsters.get(GameState.selectedMonster);
    const dc = selectedMonster.position.toDisplayCoords();
    this.pixiElem.position.set(dc.x, dc.y);
  }
}