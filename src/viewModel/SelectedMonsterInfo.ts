import * as PIXI from 'pixi.js';

import { GameState } from '../GameState';
import { IGuiElem } from './IGuiElem';
import { StateChangeEvent } from '../controller/events/StateChangeEvent';

export class SelectedMonsterInfo implements IGuiElem {
  pixiElem: PIXI.Text;

  constructor() {
    this.pixiElem = this.createTextBox();
    this.setInfo();
    GameState.emitter.addEventListener(StateChangeEvent.type,
      () => { this.setInfo(); });
  }

  private createTextBox() {
    const textBox = new PIXI.Text('');
    textBox.position.set(20, 450);
    return textBox;
  }

  private setInfo() {
    const selectedMonsterId = GameState.selectedMonster;
    const sm = GameState.monsters.get(selectedMonsterId);
    this.pixiElem.text = `name: ${sm.name} \naction-points: ${sm.actionPoints.current}/${sm.actionPoints.max} \nhit-points: ${sm.hitPoints.current}/${sm.hitPoints.max} \nhappiness: ${sm.happiness.current}/${sm.happiness.max}`;
  }
}