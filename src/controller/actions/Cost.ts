import { Monster } from "model/Monster";

export interface Cost {
    canPay(monster: Monster): boolean;
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

    static of(actionCost: number = 0, energyCost: number = 0, happinessCost: number = 0): CombinedCost {
        const costs = [];
        if (actionCost >= 0) {
            costs.push(new ActionCost(actionCost))
        }
        if (energyCost >= 0) {
            costs.push(new EnergyCost(energyCost))
        }
        if (happinessCost >= 0) {
            costs.push(new HappinessCost(happinessCost))
        }
        return new CombinedCost(costs);
    }
}

export class EnergyCost implements Cost {
    
    static all() {
        return {
            canPay(monster: Monster): boolean {
                return monster.actionPoints.current > 0;
            },
            pay(monster: Monster) {
                // must be payed in the effect to know how many energy was spent
            }
        }
    }

    energyCost: number;

    constructor(cost: number) {
        this.energyCost = cost;
    }

    canPay(monster: Monster): boolean {
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

    canPay(monster: Monster): boolean {
        return monster.actionPoints.current >= this.actionCost;
    }

    pay(monster: Monster) {
        monster.actionPoints.current -= this.actionCost;
    }
}

export class HappinessCost implements Cost {
    happinessCost: number;

    constructor(cost: number) {
        this.happinessCost = cost;
    }

    canPay(monster: Monster): boolean {
        return monster.happiness.current >= this.happinessCost;
    }

    pay(monster: Monster) {
        monster.happiness.current -= this.happinessCost;
    }
}