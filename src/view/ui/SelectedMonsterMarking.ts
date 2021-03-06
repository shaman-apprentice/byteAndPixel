import * as PIXI from 'pixi.js'

import { GameState } from '../../GameState'
import { GuiElem } from '../../view/GeneralAbstracts/GuiElem';
import { StateChangeEvent } from '../../controller/events/StateChangeEvent';
import { SelectedMonsterChangedEvent } from 'controller/events/SelectedMonsterChangedEvent';
import { Monster } from 'model/Monster';
import { Ui } from './ui';
import { selectionGlow } from 'view/utils/filters';

export class SelectedMonsterMarking extends GuiElem {
  pixiElem: PIXI.Sprite;
  currentMonster: Monster;

  constructor() {
    super();
    this.pixiElem = this.createSprite();
    this.markSelectedMonster();
    GameState.emitter.addEventListener(StateChangeEvent.type,
      () => { this.markSelectedMonster(); });
      GameState.emitter.addEventListener(SelectedMonsterChangedEvent.type,
      () => { this.markSelectedMonster(); });
  }

  private createSprite() {
    const sprite = PIXI.Sprite.from("Assets/Images/SelectionCircle.png");
    sprite.anchor.set(0.5, 0.5);
    return sprite;
  }

  private markSelectedMonster() {
    this.unmark(this.currentMonster)
    this.currentMonster = GameState.selectedMonster;
    if (this.currentMonster) {
      this.mark(this.currentMonster);
      const dc = this.currentMonster.position.toDisplayCoords();
      this.pixiElem.position.set(dc.x, dc.y);
    } else {
      this.pixiElem.visible = false;
    }
  }

  private mark(monster: Monster) {
    Ui.getMonsterView(monster)?.addFilter(selectionGlow());
  }
  
  private unmark(monster: Monster) {
    Ui.getMonsterView(monster)?.removeFilter(selectionGlow());
  }
}