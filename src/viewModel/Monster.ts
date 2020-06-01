import * as PIXI from 'pixi.js';

import { Position } from "./Position";
import { IGuiElem } from "./IGuiElem";
import { ValueWithRange } from './utils/ValueWithRange';
import { ElementSignature } from './utils/Element';
import { GameState } from 'GameState';
import { MonsterHoverEvent } from 'controller/events/MonsterHoverEvent';
import { hoverGlow } from './utils/filters';

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

        GameState.emitter.addEventListener(MonsterHoverEvent.type, (event : CustomEvent) => {
            if (event.detail == this.id) {
                this.onHover();
            } else {
                this.onHoverEnd();
            }
        })
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
        sprite.filters = [];
        return sprite;
    }

    private onHover() {
        this.addFilter(hoverGlow(this.friendly));
    }

    private onHoverEnd() {
        this.removeFilter(hoverGlow(this.friendly));
    }

    addFilter(filter: PIXI.Filter) {
        if (!this.pixiElem.filters?.includes(filter)) {
            this.pixiElem.filters.push(filter);
        }
    }
    
    removeFilter(filter: PIXI.Filter) {
        this.pixiElem.filters = this.pixiElem.filters?.filter((a) => a !== filter);
    }
}

export class MonsterStats {
    elements: ElementSignature;
    hp: number;
    energy: number;
    
    constructor(elements: ElementSignature, hp: number, energy: number) {
        this.elements = elements;
        this.hp = hp;
        this.energy = energy;
    }
}