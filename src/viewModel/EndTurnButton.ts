import * as PIXI from 'pixi.js';

import { EndTurnAction } from '../controller/actions/EndTurnAction';
import { IGuiElem } from './IGuiElem';
import { GameState } from '../GameState';
import { StateChangeEvent } from '../controller/events/StateChangeEvent';

export class EndTurnButton implements IGuiElem {
  pixiElem: PIXI.Container;
  button: PIXI.Text;

  constructor() {
    this.pixiElem = new PIXI.Container();
    this.button = this.createButton();
    this.pixiElem.addChild(this.createBackground());
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

  private createBackground() {
    const sprite = PIXI.Sprite.from("Assets/Images/brownButton.png");
    sprite.anchor.set(0.5,0.5);
    sprite.scale.set(0.2,0.15);
    return sprite;
  }

  private updateText() {
    this.button.text = "End Turn " + GameState.turn;
  }


}