import * as PIXI from 'pixi.js';

import { Position } from "./Position";
import { GuiElem } from "./GeneralAbstracts/GuiElem";
import { ValueWithRange } from './utils/ValueWithRange';
import { ElementSignature } from './utils/Element';
import { GameState } from 'GameState';
import { hoverGlow, actionGlow } from './utils/filters';
import { StateChangeEvent } from 'controller/events/StateChangeEvent';
import { MouseHoverEvent } from 'controller/events/MouseHoverEvent';
import { Skill, SkillType } from '../controller/skills/Skill';
import { Skills } from './utils/skills';

export class Monster extends GuiElem {
    private static idCounter = 0;
    private static displayOffset = -6;

    pixiElem: PIXI.Sprite;
    readonly id;
    name: string;
    elements: ElementSignature;
    actionPoints: ValueWithRange;
    energy: ValueWithRange;
    hitPoints: ValueWithRange;
    happiness: ValueWithRange;
    friendly: boolean;
    lastFight: number = 0;
    experiencePoints: ValueWithRange;
    skillList: Skill[];
    private _position: Position;

    constructor(name: string, position: Position, baseStats: MonsterStats, friendly: boolean = true) {
        super();
        this.id = Monster.idCounter++;
        this.name = name;
        this.friendly = friendly;
        this.pixiElem = this.createSprite();
        this.position = position;
        this.elements = baseStats.elements;
        this.actionPoints = new ValueWithRange(baseStats.actionPoints);
        this.energy = new ValueWithRange(baseStats.energy)
        this.hitPoints = new ValueWithRange(baseStats.hp);
        this.experiencePoints = new ValueWithRange(5, 0);
        this.happiness = new ValueWithRange(100, 50);
        this.skillList = this.getBaseSkills();

        this.checkActionPoints();

        GameState.emitter.addEventListener(MouseHoverEvent.type, () => {
            this.checkHover();
        });
        GameState.emitter.addEventListener(StateChangeEvent.type, () => {
            this.checkActionPoints();
            this.checkHover();
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

    moveImage(x: number, y: number) {
        // used in animation to temporarly move the image without changing its position
        // this is overwritten by changing the position
        this.pixiElem.position.set(x,y + Monster.displayOffset);
    }

    resetImage() {
        const dc = this.position.toDisplayCoords();
        this.pixiElem.position.set(dc.x, dc.y + Monster.displayOffset);
    }

    private createSprite() {
        const sprite = PIXI.Sprite.from("Assets/Images/Monster/" + this.name + ".png");
        sprite.anchor.set(0.5, 0.5);
        sprite.filters = [];
        return sprite;
    }

    private checkHover() {
        if (GameState.mousePosition.isEqual(this.position)) {
            this.onHover();
        } else {
            this.onHoverEnd();
        }
    }

    private onHover() {
        this.addFilter(hoverGlow());
    }

    private onHoverEnd() {
        this.removeFilter(hoverGlow());
    }

    private checkActionPoints() {
        if (this.actionPoints.current > 0) {
            this.addFilter(actionGlow(this.friendly));
        } else {
            this.removeFilter(actionGlow(this.friendly));
        }
    }

    private getBaseSkills() {
        return [Skills.defaultAttack(), Skill.walk(), Skill.cleanse(), Skill.rest()];
    }

    learnSkill(skill: Skill) {
        if (!(this.skillList.map((s) => s.name).includes(skill.name))) {
            this.skillList.push(skill);
        }
    }

    skillByType(skilltype: SkillType, index : number = 0) : Skill {
        return this.skillList.filter((skill) => skill.type == skilltype)[index];
    }
}

export class MonsterStats {
    elements: ElementSignature;
    hp: number;
    energy: number;
    actionPoints: number;
    xp: number;

    constructor(elements: ElementSignature, hp: number, energy: number, actionPoints: number) {
        this.elements = elements;
        this.hp = hp;
        this.energy = energy;
        this.actionPoints = actionPoints;
    }
}