import { Action } from "controller/actions/Action";
import { TilePosition } from "model/TilePosition";
import { Monster, MonsterStats } from "model/Monster";

export abstract class Enemy extends Monster {
    abstract aiAction: () => Action;

    constructor(name: string, position: TilePosition, baseStats: MonsterStats) {
        super(name, position, baseStats, false);
    }

}