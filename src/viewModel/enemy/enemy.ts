import { Monster, MonsterStats } from "viewModel/Monster";
import { Position } from "../Position";
import { Action } from "controller/actions/Action";

export abstract class Enemy extends Monster {
    abstract aiAction: () => Action;

    constructor(name: string, position: Position, baseStats: MonsterStats) {
        super(name, position, baseStats, false);
    }

}