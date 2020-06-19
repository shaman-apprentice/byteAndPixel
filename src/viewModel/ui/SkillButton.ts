import * as PIXI from 'pixi.js';
import { UiElementWithBackground } from './UiElementWithBackground';
import {Monster} from "../Monster";
import { Position } from 'viewModel/Position';
import { AttackAction } from 'controller/actions/AttackAction';


export class SkillButton extends UiElementWithBackground{
    button: PIXI.Text;
    pixiElem: PIXI.Container;

    constructor(name: string, attackerID: number, target: Position, buttonPos: Position){
        super("brown Button", 100, 20);
        this.button = this.createSkillButton(name, attackerID, target);
        this.pixiElem.addChild(this.button);
    }
    createSkillButton(name:string, attackerID: number, target: Position){
        const button = new PIXI.Text(name);
        button.interactive = true;
        button.buttonMode = true;
        button.on("click", () => new AttackAction(attackerID, target).execute());
        button.anchor.set(0.5, 0.5);
        return button;
    }
}

export class SkillPossibilities{
    buttons: SkillButton[];
    position: Position;
    buttonContainer: PIXI.Container;
    visibility: boolean;

    constructor(monster: Monster, target: Monster){
        const skills = monster.skillList;
        const id = monster.id;
        this.visibility = true;
        this.position = target.position;
        for(var i = 0; i<skills.length; i++){
            const addPos = new Position(0, i);
            this.addButton(skills[i].name, id, target.position, this.position.add(addPos));
        }
        this.buttonContainer.position.set(target.position.x, target.position.y);
    }

    addButton(name: string, id: number, target: Position, position: Position){
        const button = new SkillButton(name, id, target, position);
        this.buttons.push(button);
        this.buttonContainer.addChild(button.pixiElem);
    }
}