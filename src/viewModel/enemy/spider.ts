import { Enemy } from "./enemy";
import { GameState } from "GameState";
import { Position } from "../Position";
import { spiderStats } from "viewModel/utils/monster";
import { closestMonster } from "../utils/ai";
import { Monster } from "viewModel/Monster";
import { firstStep } from "viewModel/utils/map";
import { Action } from "controller/actions/Action";
import { AttackAction } from "controller/actions/AttackAction";
import { ChangeTileSlimeAction } from "controller/actions/ChangeTileSlimeAction";
import { MoveAction } from "controller/actions/MoveAction";
import {GlowFilter} from "@pixi/filter-glow";

export class Spider extends Enemy {
    aiAction: () => void = () => {
        const glowFilter = new GlowFilter({distance: 10,outerStrength: 4, innerStrength: 1, color: 0xff0000 ,quality: 0.2}  );
        const targetMonster = closestMonster(this.position, GameState.monsters.getValues().filter(monster => monster.friendly));
        if (!targetMonster) {
            this.actionPoints.current = 0;
            return;
        }

        while (this.actionPoints.current >= 1) {
            this.singleAction(targetMonster);
            this.pixiElem.filters = [glowFilter];
        }
        //this one might work better when the enemies have more than 1 action point
        //this.pixiElem.filters = null;
    }

    singleAction(targetMonster: Monster) {
        
        const stepPosition = this.position.add(firstStep(this.position, targetMonster.position))
        const actions: Action[] = [new AttackAction(this.id, stepPosition)
            , new ChangeTileSlimeAction(this.id, stepPosition, true)
        , new MoveAction(this.id, stepPosition)];
    
        //Does the first action possible
        const result = actions.find(action => action.execute());
        if (!result) {
            this.actionPoints.current = 0;       
        }
    }

    static spawn(position: Position) {
        const monster = new Spider("spider", position, spiderStats)
        GameState.addMonster(monster);
    }

}