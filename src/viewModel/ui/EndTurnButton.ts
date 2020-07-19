import * as PIXI from 'pixi.js';

import { EndTurnAction } from '../../controller/actions/EndTurnAction';
import { GameState } from '../../GameState';
import { StateChangeEvent } from '../../controller/events/StateChangeEvent';
import { GuiElemBg } from '../GeneralAbstracts/GuiElemBg';

export class EndTurnButton extends GuiElemBg {
  pixiElem: PIXI.Container;
  pixiElemBg: PIXI.DisplayObject;
  button: PIXI.Text;

  constructor() {
    super();
    this.pixiElem = new PIXI.Container();
    this.pixiElemBg = this.pixiElem.addChild(this.createBackground({path: "brownButton", width: 200, height: 50}));
    this.button = this.createButton();
    this.pixiElem.addChild(this.button);
    this.pixiElem.position.set(680, 40);
    GameState.emitter.addEventListener(StateChangeEvent.type, () => this.updateText())
  }

  private createButton() {
    const button = new PIXI.Text("End Turn 1");
    button.interactive = true;
    button.buttonMode = true;
    button.on("click", () => new EndTurnAction().execute())
    button.anchor.set(0.5,0.5);
    return button;
  }

  private updateText() {
    this.button.text = "End Turn " + GameState.turn;
  }


}