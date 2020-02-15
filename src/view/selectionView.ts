import * as PIXI from 'pixi.js';
import { GameState } from "../model/gameState";
import { Position } from "../model/position";
import { Ui } from "./ui";


export class SelectionView {
    sprite: PIXI.Sprite;

    constructor (state: GameState, container: PIXI.Container) {
        let position = state.monsters[state.currentMonster].position;
        this.createCircle(container);
        this.updatePosition(position);
    }

    createCircle(container: PIXI.Container) {
        this.sprite = PIXI.Sprite.from("Assets/Images/SelectionCircle.png")
        this.sprite.anchor.set(0.5, 0.5);
        container.addChild(this.sprite);
    }

    updatePosition(position: Position) {
        let dc = Ui.toDisplayCoords(position.x, position.y);
        this.sprite.position.set(dc.x, dc.y);
    }

    update(state: GameState) {
        let position = state.monsters[state.currentMonster].position;
        this.updatePosition(position);
    }
}