import * as PIXI from 'pixi.js';

import { GuiElemBg } from '../GeneralAbstracts/GuiElemBg';
import { Monster } from 'viewModel/Monster';

export abstract class MonsterInfoBox extends GuiElemBg {
  pixiElem: PIXI.Container;
  pixiElemBg: PIXI.DisplayObject;
  textBox: PIXI.Text;

  constructor() {
    super();
    this.pixiElem = new PIXI.Container();
    this.pixiElemBg = this.pixiElem.addChild(this.createBackground({path: "StatusBackground", width: 450, height:400}));
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
    this.textBox.text = `name: ${monster.name} \naction-points: ${monster.actionPoints.current}/${monster.actionPoints.max} \nenergy: ${monster.energy.current}/${monster.energy.max} \nhit-points: ${monster.hitPoints.current}/${monster.hitPoints.max} \nhappiness: ${monster.happiness.current}/${monster.happiness.max} \nxp: ${monster.experiencePoints.current}/${monster.experiencePoints.max}`;
  }
}