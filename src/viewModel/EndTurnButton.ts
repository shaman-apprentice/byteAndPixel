import * as PIXI from 'pixi.js';

import { EndTurnAction } from '../controller/EndTurnAction';
import { IGuiElem } from './IGuiElem';
import { GameState } from '../GameState';
import { StateChangeEvent } from '../controller/StateChangeEvent';

export class EndTurnButton implements IGuiElem {
  pixiElem: PIXI.Text;

  constructor() {
    let endTurn = new PIXI.Text("End Turn 1");
    endTurn.interactive = true;
    endTurn.buttonMode = true;
    endTurn.on("click", () => new EndTurnAction().doExecute())
    endTurn.position.set(650, 20);
    this.pixiElem = endTurn;
    GameState.emitter.addEventListener(StateChangeEvent.type, () => (this.updateText()))
  }

  private updateText() {
    let turnNumber = GameState.turn
    this.pixiElem.text = "End Turn " + turnNumber;
  }


}