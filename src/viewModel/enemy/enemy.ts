import { Monster, MonsterStats } from "viewModel/Monster";
import { Position } from "../Position";
import {GlowFilter} from "@pixi/filter-glow";
export abstract class Enemy extends Monster {
    abstract aiAction: () => void;

    constructor(name: string, position: Position, baseStats: MonsterStats) {
        super(name, position, baseStats, false);
        const enemyFilter = new GlowFilter({distance: 10,outerStrength: 4, innerStrength: 1, color: 0xff0000 ,quality: 0.2}  );
        this.pixiElem.filters = [enemyFilter];
    }


}