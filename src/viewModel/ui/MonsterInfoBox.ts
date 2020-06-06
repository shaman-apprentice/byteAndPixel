import * as PIXI from 'pixi.js';

import { UiElementWithBackground } from './UiElementWithBackground';
import { Monster } from 'viewModel/Monster';

export abstract class MonsterInfoBox extends UiElementWithBackground {
  pixiElem: PIXI.Container;
  textBox: PIXI.Text;

  constructor() {
    super("Assets/Images/parchment.png", 270, 200);
    this.textBox = this.createTextBox();
    this.pixiElem.addChild(this.textBox);
  }

  private createTextBox() {
    const textBox = new PIXI.Text('');
    textBox.anchor.set(0.5,0.5);
    return textBox;
  }

  protected setInfo(monster: Monster) {
    if (!monster) {
      this.pixiElem.visible = false;
      return;
    } else {
      this.pixiElem.visible = true;
    }
    this.textBox.text = `name: ${monster.name} \naction-points: ${monster.actionPoints.current}/${monster.actionPoints.max} \nhit-points: ${monster.hitPoints.current}/${monster.hitPoints.max} \nhappiness: ${monster.happiness.current}/${monster.happiness.max}`;
  }
}