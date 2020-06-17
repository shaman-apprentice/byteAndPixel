import {ElementSignature} from '../../viewModel/utils/Element';

export class Skill{
    name: string;
    elements: ElementSignature;
    damage: number;
    cost: number;

    constructor(name: string, element: ElementSignature, damage: number, cost: number){
        this.name = name;
        this.elements = element;
        this.damage = damage;
        this.cost = cost;
    }

}