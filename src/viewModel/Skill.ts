import {ElementSignature} from './utils/Element';

export class Skill{
    private static idCounter = 0;
    name: string;
    readonly id;
    elements: ElementSignature;
    damage: number; //heal skills should have a negative number here
    cost: number;

    constructor(name: string, element: ElementSignature, damage: number, cost: number){
        this.id = Skill.idCounter++;
        this.name = name;
        this.elements = element;
        this.damage = damage;
        this.cost = cost;
        //maybe insert range, buff, debuff
    }

}