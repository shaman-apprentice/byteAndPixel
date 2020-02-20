import * as PIXI from 'pixi.js';

import { Position } from "./Position";
import { IGuiElem } from "./IGuiElem";

export class Monster implements IGuiElem {
    private static idCounter = 0;
    
    readonly id;
    name: string; 
    actionPoints: number;
    pixiElem: PIXI.Sprite;
    private _position: Position;

    constructor(name: string, posi: Position) {
        this.id = Monster.idCounter++;
        this.name = name; 
        this.pixiElem = this.createSprite();
        this.position = posi;
        this.actionPoints = 2;
    }

    set position(posi: Position) {
        this._position = posi;
        const dc = this.position.toDisplayCoords();
        this.pixiElem.position.set(dc.x, dc.y);
    }

    get position() {
        return this._position;
    }

    private createSprite() {
        const sprite = PIXI.Sprite.from("Assets/Images/Monster/" + this.name + ".png");
        sprite.anchor.set(0.5, 0.5);
        return sprite;
    }
}
