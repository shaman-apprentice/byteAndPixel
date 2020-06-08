import * as PIXI from 'pixi.js';

import { EndTurnAction } from '../../controller/actions/EndTurnAction';
import { GameState } from '../../GameState';
import { StateChangeEvent } from '../../controller/events/StateChangeEvent';
import { UiElementWithBackground } from './UiElementWithBackground';

export class EndTurnButton extends UiElementWithBackground {
  pixiElem: PIXI.Container;
  button: PIXI.Text;

  constructor() {
    super("brownButton", 200, 50);
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