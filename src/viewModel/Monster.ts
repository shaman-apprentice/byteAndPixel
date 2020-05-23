import * as PIXI from 'pixi.js';

import { Position } from "./Position";
import { IGuiElem } from "./IGuiElem";
import { MonsterRemoveEvent } from '../controller/events/MonsterRemoveEvent';
import { GameState } from '../GameState';
import { ValueWithRange } from './utils/ValueWithRange';
import { ElementSignature } from './utils/Element';

export class Monster implements IGuiElem {
    private static idCounter = 0;
    private static displayOffset = -6;
    
    pixiElem: PIXI.Sprite;
    readonly id;
    name: string;
    elements: ElementSignature;
    actionPoints: ValueWithRange;
    hitPoints: ValueWithRange;
    happiness: ValueWithRange;
    friendly: boolean;
    lastFight: number = 0;
    private _position: Position;

    constructor(name: string, position: Position, baseStats: MonsterStats, friendly: boolean = true) {
        this.id = Monster.idCounter++;
        this.name = name;
        this.friendly = friendly;
        this.pixiElem = this.createSprite();
        this.position = position;
        this.elements = baseStats.elements;
        this.actionPoints = new ValueWithRange(baseStats.energy);
        this.hitPoints = new ValueWithRange(baseStats.hp);
        this.happiness = new ValueWithRange(100, 50);
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

    die() {
        MonsterRemoveEvent.dispatch(this);
        if (GameState.selectedMonster == this.id) {
            GameState.selectedMonster = GameState.monsters.getValues().find(monster => monster.friendly && monster.id != this.id).id
        }
        GameState.monsters.delete(this.id);
    }
}

export class MonsterStats {
    elements: ElementSignature;
    hp: number;
    energy: number;
    
    constructor(elements: ElementSignature, hp: number, enegry: number) {
        this.elements = elements;
        this.hp = hp;
        this.energy = enegry;
    }
}
