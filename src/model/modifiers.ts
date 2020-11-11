import { Monster } from "model/Monster";
import { ElementSignature } from "./Element";
import { ModifiedValue } from "./util/ModifiedValue";

export const updateModifiedMonster = (monster: Monster) => {
    const modifiedStats = new ModifiedStats();
    const baseStats = monster.baseStats;
    monster.modifiers.forEach(mods => {
        mods.apply(modifiedStats);
    })
    debugger
    monster.body = modifiedStats.body.modifiedValue(baseStats.body);
    monster.mind = modifiedStats.mind.modifiedValue(baseStats.mind);
    monster.soul = modifiedStats.soul.modifiedValue(baseStats.soul);

    monster.hitPoints.max = baseStats.baseHitPoints + monster.body * baseStats.baseHitpointPerBody;
    monster.energy.max = baseStats.baseEnergy + monster.soul * baseStats.baseEnergyPerSoul;
    monster.actionPoints.max = modifiedStats.actionPoints.modifiedValue(baseStats.baseActionPoints);

}

export class BaseStats {
    constructor(
        public readonly elements: ElementSignature,
        public readonly body: number,
        public readonly mind: number,
        public readonly soul: number,
        public readonly baseHitPoints: number = 5,
        public readonly baseHitpointPerBody: number = 1,
        public readonly baseEnergy: number = 50,
        public readonly baseEnergyPerSoul: number = 5,
        public readonly baseActionPoints: number = 2,
    ) { }
}

export class ModifiedStats {
    body: ModifiedValue = new ModifiedValue();
    mind: ModifiedValue = new ModifiedValue();
    soul: ModifiedValue = new ModifiedValue();

    hitPoints: ModifiedValue = new ModifiedValue();
    actionPoints: ModifiedValue = new ModifiedValue();
    energy: ModifiedValue = new ModifiedValue();
}