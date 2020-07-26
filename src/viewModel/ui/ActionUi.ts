import * as PIXI from 'pixi.js';
import { GameState } from "GameState";
import { StateChangeEvent } from "controller/events/StateChangeEvent";
import { SelectedMonsterChangedEvent } from "controller/events/SelectedMonsterChangedEvent";
import { ActionSelectionEvent } from 'controller/events/ActionSelectionEvent';
import { GuiElem } from './GuiElem';

export class ActionUI extends GuiElem {
    pixiElem: PIXI.Text;
    // this is a dummy intended to be replaced by susi`s implementation
    // when you have to merge this please register the following Listener
    constructor() {
        super();
        this.pixiElem = new PIXI.Text("Walk");
        this.pixiElem.position.set(400,530);
        GameState.emitter.addEventListener(StateChangeEvent.type, () => { this.clearActionSelection()});
        GameState.emitter.addEventListener(SelectedMonsterChangedEvent.type, () => { this.clearActionSelection()});
        GameState.emitter.addEventListener(ActionSelectionEvent.type, () => { this.showSelectedAction()});
    }

    clearActionSelection() {
        GameState.selectedAction = undefined;
    }

    showSelectedAction() {
        const selectedAction = GameState.selectedAction;
        this.pixiElem.text = selectedAction ? selectedAction.name : "Walk";
    }

    

}