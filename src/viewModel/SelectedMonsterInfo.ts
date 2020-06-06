import * as PIXI from 'pixi.js';

import { GameState } from '../GameState';
import { IGuiElem } from './IGuiElem';
import { StateChangeEvent } from '../controller/events/StateChangeEvent';

export class SelectedMonsterInfo implements IGuiElem {
  pixiElem: PIXI.Container;
  textBox: PIXI.Text;

  constructor() {
    this.pixiElem = new PIXI.Container();
    this.pixiElem.position.set(135,505)
    this.textBox = this.createTextBox();
    this.pixiElem.addChild(this.createBackground());
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

  private createBackground() {
    const sprite = PIXI.Sprite.from("Assets/Images/parchment.png")
    sprite.anchor.set(0.5,0.5);
    sprite.scale.set(0.7,0.5);
    return sprite;
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