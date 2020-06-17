import {ElementSignature} from '../../viewModel/utils/Element';
import { Cost, CombinedCost, EnergyCost, ActionCost } from 'controller/actions/Cost';

export class Skill{
    name: string;
    elements: ElementSignature;
    damage: number;
    cost: Cost;

    constructor(name: string, element: ElementSignature, damage: number, energyCost: number, actionCost: number){
        this.name = name;
        this.elements = element;
        this.damage = damage;
        this.cost = new CombinedCost([new EnergyCost(energyCost), new ActionCost(actionCost)]);
    }

}