import * as PIXI from 'pixi.js'

import { GameState } from '../GameState'
import { SelectedMonsterChangeEvent } from '../controller/SelectedMonsterChangeEvent';
import { MonsterMoveEvent } from '../controller/MonsterMoveEvent';
import { IGuiElem } from './IGuiElem';

export class SelectedMonsterMarking implements IGuiElem {
  pixiElem: PIXI.Sprite;

  constructor(selectedMonsterId: number) {
    this.pixiElem = this.createSprite();
    this.markSelectedMonster(selectedMonsterId);
    GameState.emitter.addEventListener(SelectedMonsterChangeEvent.type,
      (event: SelectedMonsterChangeEvent) => { this.markSelectedMonster(event.detail); });
    GameState.emitter.addEventListener(MonsterMoveEvent.type,
      (event: MonsterMoveEvent) => { this.markSelectedMonster(event.detail.id); });
  }

  private createSprite() {
    const sprite = PIXI.Sprite.from("Assets/Images/SelectionCircle.png");
    sprite.anchor.set(0.5, 0.5);
    return sprite;
  }

  private markSelectedMonster(selectedMonsterId: number) {
    const selectedMonster = GameState.monsters[GameState.selectedMonster];
    const dc = selectedMonster.position.toDisplayCoords();
    this.pixiElem.position.set(dc.x, dc.y);
  }
}