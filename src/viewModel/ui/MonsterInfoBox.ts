import * as PIXI from 'pixi.js';

import { UiElementWithBackground } from './UiElementWithBackground';
import { Monster } from 'viewModel/Monster';

export abstract class MonsterInfoBox extends UiElementWithBackground {
  pixiElem: PIXI.Container;
  textBox: PIXI.Text;

  constructor() {
    super("StatusBackground", 450, 400);
    this.textBox = this.createTextBox();
    this.pixiElem.addChild(this.textBox);
  }

  private createTextBox() {
    const textBox = new PIXI.Text('');
    textBox.scale.set(0.75, 0.75);
    textBox.anchor.set(0.35,0.65);
    return textBox;
  }

  protected setInfo(monster: Monster) {
    if (!monster) {
      this.pixiElem.visible = false;
      return;
    } else {
      this.pixiElem.visible = true;
    }
    this.textBox.text = `name: ${monster.name} \naction-points: ${monster.actionPoints.current}/${monster.actionPoints.max} \nenergy: ${monster.energy.current}/${monster.hitPoints.max} \nhit-points: ${monster.hitPoints.current}/${monster.hitPoints.max} \nhappiness: ${monster.happiness.current}/${monster.happiness.max}`;
  }
}