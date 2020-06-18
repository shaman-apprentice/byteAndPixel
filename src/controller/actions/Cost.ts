import { Monster } from "viewModel/Monster";

export interface Cost {
    canPay(monster: Monster) : boolean;
    pay(monster: Monster)
}

export class CombinedCost implements Cost {
    private subCosts: Cost[];

    constructor(subCosts: Cost[]) {
        this.subCosts = subCosts;
    }

    canPay(monster: Monster): boolean {
        return this.subCosts.every(cost => cost.canPay(monster));
    }

    pay(monster: Monster) {
        this.subCosts.forEach(cost => cost.pay(monster));
    }
}

export class EnergyCost implements Cost {
    energyCost: number;

    constructor(cost: number) {
        this.energyCost = cost;
    }

    canPay(monster: Monster) : boolean {
        return monster.energy.current >= this.energyCost;
    }

    pay(monster: Monster) {
        monster.energy.current -= this.energyCost;
    }
}

export class ActionCost implements Cost {
    actionCost: number;

    constructor(cost: number) {
        this.actionCost = cost;
    }

    canPay(monster: Monster) : boolean {
        return monster.actionPoints.current >= this.actionCost;
    }

    pay(monster: Monster) {
        monster.actionPoints.current -= this.actionCost;
    }
}