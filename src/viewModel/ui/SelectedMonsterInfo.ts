import * as PIXI from 'pixi.js';

import { GameState } from '../../GameState';
import { StateChangeEvent } from '../../controller/events/StateChangeEvent';
import { UiElementWithBackground } from './UiElementWithBackground';

export class SelectedMonsterInfo extends UiElementWithBackground {
  pixiElem: PIXI.Container;
  textBox: PIXI.Text;

  constructor() {
    super("Assets/Images/parchment.png", 270, 200);
    this.pixiElem.position.set(135,505)
    this.textBox = this.createTextBox();
    this.pixiElem.addChild(this.textBox);
    this.setInfo();
    GameState.emitter.addEventListener(StateChangeEvent.type,
      () => { this.setInfo(); });
  }

  private createTextBox() {
    const textBox = new PIXI.Text('');
    textBox.anchor.set(0.5,0.5);
    return textBox;
  }

  private setInfo() {
    const selectedMonsterId = GameState.selectedMonster;
    if (selectedMonsterId == -1) {
      this.pixiElem.visible = false;
      return;
    } else {
      this.pixiElem.visible = true;
    }
    const sm = GameState.monsters.get(selectedMonsterId);
    this.textBox.text = `name: ${sm.name} \naction-points: ${sm.actionPoints.current}/${sm.actionPoints.max} \nhit-points: ${sm.hitPoints.current}/${sm.hitPoints.max} \nhappiness: ${sm.happiness.current}/${sm.happiness.max}`;
  }
}