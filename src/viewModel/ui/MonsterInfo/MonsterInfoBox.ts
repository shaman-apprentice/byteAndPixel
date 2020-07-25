import * as PIXI from 'pixi.js';

import { GuiElemBg } from 'viewModel/GeneralAbstracts/GuiElemBg';
import { Monster } from 'viewModel/Monster';
import {width,height} from 'index';

export class MonsterInfoBox extends GuiElemBg {
  pixiElem: PIXI.Container;
  pixiElemBg: PIXI.DisplayObject;
  textBox: PIXI.Text;
  nameBox: PIXI.Text;
  bmstextBox: PIXI.Text;
  monsterPic: PIXI.Sprite;

  constructor() {
    super({path: "BgBox", width: width, height:150});
    this.pixiElem.position.set(400,525);
    this.textBox = this.createTextBox({xpos:0,ypos:0});
    this.nameBox = this.createTextBox({xpos:-width/2+20,ypos:-40});
    this.bmstextBox = this.createTextBox({xpos:-width/4+20,ypos:0.5});
    this.monsterPic = this.createSprite();
    this.pixiElem.addChild(this.textBox, this.nameBox, this.bmstextBox, this.monsterPic);
  }

  private createTextBox({xpos, ypos}:{xpos:number, ypos:number}) {
    const textBox = new PIXI.Text('');
    textBox.scale.set(0.75);
    textBox.anchor.set(0,0.5);
    textBox.position.set(xpos,ypos);
    return textBox;
  }


  private createSprite() {
    const sprite = new PIXI.Sprite();
    sprite.anchor.set(0.5, 0.5);
    sprite.filters = [];
    sprite.position.set(-width/2+75,0);
    return sprite;
  }

  protected setInfo(monster: Monster) {
    if (!monster) {
      this.pixiElem.visible = false;
      return;
    } else {
      this.pixiElem.visible = true;
    }
    this.textBox.text = `action-points: ${monster.actionPoints.current}/${monster.actionPoints.max} \nenergy: ${monster.energy.current}/${monster.energy.max} \nhit-points: ${monster.hitPoints.current}/${monster.hitPoints.max} \nhappiness: ${monster.happiness.current}/${monster.happiness.max} \nxp: ${monster.experiencePoints.current}/${monster.experiencePoints.max}`;
    this.nameBox.text = `name: ${monster.name} \n`;
    this.bmstextBox.text = `Element: \nBody: \nMind: \nSoul: \n`;
    this.monsterPic.texture = monster.pixiElem.texture;
  }
}