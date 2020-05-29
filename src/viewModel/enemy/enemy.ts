import { Monster, MonsterStats } from "viewModel/Monster";
import { Position } from "../Position";

export abstract class Enemy extends Monster {
    abstract aiAction: () => void;

    constructor(name: string, position: Position, baseStats: MonsterStats) {
        super(name, position, baseStats, false);
    }

}