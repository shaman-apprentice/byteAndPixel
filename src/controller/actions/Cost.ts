import { Monster } from "viewModel/Monster";

export abstract class Cost {
    abstract canPay(monster: Monster) : boolean;
    abstract pay(monster: Monster)
}

export class CombinedCost extends Cost {
    private subCosts: Cost[];

    constructor(subCosts: Cost[]) {
        super();
        this.subCosts = subCosts;
    }

    canPay(monster: Monster): boolean {
        return this.subCosts.every(cost => cost.canPay(monster));
    }

    pay(monster: Monster) {
        this.subCosts.forEach(cost => cost.pay(monster));
    }
}

export class EnergyCost extends Cost {
    energyCost: number;

    constructor(cost: number) {
        super();
        this.energyCost = cost;
    }

    canPay(monster: Monster) : boolean {
        return monster.energy.current >= this.energyCost;
    }

    pay(monster: Monster) {
        monster.energy.current -= this.energyCost;
    }
}

export class ActionCost extends Cost {
    actionCost: number;

    constructor(cost: number) {
        super();
        this.actionCost = cost;
    }

    canPay(monster: Monster) : boolean {
        return monster.actionPoints.current >= this.actionCost;
    }

    pay(monster: Monster) {
        monster.actionPoints.current -= this.actionCost;
    }
}