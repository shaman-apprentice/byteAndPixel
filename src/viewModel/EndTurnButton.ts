import * as PIXI from 'pixi.js';

import { EndTurnAction } from '../controller/actions/EndTurnAction';
import { IGuiElem } from './IGuiElem';
import { GameState } from '../GameState';
import { StateChangeEvent } from '../controller/events/StateChangeEvent';

export class EndTurnButton implements IGuiElem {
  pixiElem: PIXI.Text;

  constructor() {
    this.pixiElem = new PIXI.Text("End Turn 1");
    this.pixiElem.interactive = true;
    this.pixiElem.buttonMode = true;
    this.pixiElem.on("click", () => new EndTurnAction().execute())
    this.pixiElem.position.set(650, 20);
    GameState.emitter.addEventListener(StateChangeEvent.type, () => this.updateText())
  }

  private updateText() {
    this.pixiElem.text = "End Turn " + GameState.turn;
  }


}