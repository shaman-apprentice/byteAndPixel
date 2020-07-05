import { Enemy } from "./enemy";
import { GameState } from "GameState";
import { Position } from "../Position";
import { spiderStats } from "viewModel/utils/monster";
import { closestMonster } from "../utils/ai";
import { Monster } from "viewModel/Monster";
import { firstStep } from "viewModel/utils/map";
import { Action } from "controller/actions/Action";
import { SkillAction } from "controller/actions/SkillAction";
import { Skill } from "controller/skills/Skill";

export class Spider extends Enemy {
    aiAction: () => void = () => {

        const targetMonster = closestMonster(this.position, GameState.monsters.getValues().filter(monster => monster.friendly));
        if (!targetMonster) {
            this.actionPoints.current = 0;
            return;
        }

        while (this.actionPoints.current >= 1) {
            this.singleAction(targetMonster);
        }
    }

    singleAction(targetMonster: Monster) {
        const stepPosition = this.position.add(firstStep(this.position, targetMonster.position))
        const actions: Action[] = [new SkillAction(this.id, stepPosition, this.skillList[0])
            , new SkillAction(this.id, stepPosition, Skill.slime())
        , new SkillAction(this.id, stepPosition, Skill.walk())];
    
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