import * as PIXI from 'pixi.js';

import { EndTurnEvent } from '../controller/EndTurnEvent';
import { IGuiElem } from './IGuiElem';
import { GameState } from '../GameState';

export class EndTurnButton implements IGuiElem {
  pixiElem: PIXI.Text;

  constructor() {
    let endTurn = new PIXI.Text("End Turn 1");
    endTurn.interactive = true;
    endTurn.buttonMode = true;
    endTurn.on("click", () => EndTurnEvent.dispatch())
    endTurn.position.set(650, 20);
    this.pixiElem = endTurn;
    GameState.emitter.addEventListener(EndTurnEvent.type, (event: EndTurnEvent) => (this.updateText(event.detail.turn)))
  }

  private updateText(turnNumber: number) {
    this.pixiElem.text = "End Turn " + turnNumber;
  }


}