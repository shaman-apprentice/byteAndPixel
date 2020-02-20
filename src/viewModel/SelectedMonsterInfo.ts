import * as PIXI from 'pixi.js';

import { GameState } from '../GameState';
import { SelectedMonsterChangeEvent } from '../controller/SelectedMonsterChangeEvent';
import { MonsterMoveEvent } from '../controller/MonsterMoveEvent';
import { IGuiElem } from './IGuiElem';

export class SelectedMonsterInfo implements IGuiElem {
  pixiElem: PIXI.Text;

  constructor(selectedMonsterId: number) {
    this.pixiElem = this.createTextBox();
    this.setInfo(selectedMonsterId);
    GameState.emitter.addEventListener(SelectedMonsterChangeEvent.type,
      (event: SelectedMonsterChangeEvent) => { this.setInfo(event.detail); });
    GameState.emitter.addEventListener(MonsterMoveEvent.type,
      (event: MonsterMoveEvent) => { this.setInfo(event.detail.id); });
  }

  private createTextBox() {
    const textBox = new PIXI.Text('');
    textBox.position.set(20, 500);
    return textBox;
  }

  private setInfo(selectedMonsterId: number) {
    const sm = GameState.monsters[selectedMonsterId]
    this.pixiElem.text = `name: ${sm.name} \naction-points: ${sm.actionPoints}/2`;
  }
}