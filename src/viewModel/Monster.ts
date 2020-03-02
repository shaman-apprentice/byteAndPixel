import * as PIXI from 'pixi.js';

import { Position } from "./Position";
import { IGuiElem } from "./IGuiElem";

export class Monster implements IGuiElem {
    private static idCounter = 0;
    private static displayOffset = -6;
    
    readonly id;
    name: string; 
    actionPoints: number;
    hitPoints: number;
    friendly: boolean;
    pixiElem: PIXI.Sprite;
    private _position: Position;

    constructor(name: string, position: Position, friendly: boolean = true) {
        this.id = Monster.idCounter++;
        this.name = name;
        this.friendly = friendly;
        this.pixiElem = this.createSprite();
        this.position = position;
        this.actionPoints = 2;
        this.hitPoints = 6;
    }

    set position(posi: Position) {
        this._position = posi;
        const dc = this.position.toDisplayCoords();
        this.pixiElem.position.set(dc.x, dc.y + Monster.displayOffset);
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
