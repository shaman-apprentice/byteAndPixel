import { Enemy } from "./enemy";
import { GameState } from "GameState";
import { spiderStats } from "viewModel/utils/monster";
import { closestMonster } from "../../viewModel/utils/ai";
import { firstStep } from "viewModel/utils/map";
import { Action } from "controller/actions/Action";
import { SkillAction } from "controller/actions/SkillAction";
import { Skill, SkillType } from "controller/skills/Skill";
import { Target, CombinedTarget } from "controller/actions/Target";
import { CombinedCost } from "controller/actions/Cost";
import { ElementSignature } from "viewModel/utils/Element";
import { Monster } from "model/Monster";
import { TilePosition } from "model/TilePosition";

export class Spider extends Enemy {
    aiAction: () => Action = () => {

        const targetMonster = closestMonster(this.position, GameState.monsters.getValues().filter(monster => monster.friendly));
        if (!targetMonster) {
            this.actionPoints.current = 0;
            return new SkillAction(this, this.position, this.skillByType(SkillType.REST));
        }

        return this.singleAction(targetMonster);
    }

    singleAction(targetMonster: Monster) : Action {
        const stepPosition = this.position.add(firstStep(this.position, targetMonster.position))
        const actions: Action[] = [new SkillAction(this, stepPosition, this.skillList[0])
            , new SkillAction(this, stepPosition, Skill.slime())
        , new SkillAction(this, stepPosition, Skill.walk())];
    
        //Does the first action possible
        const result = actions.find(action => action.canExecute());
        return result ? result : new SkillAction(this, this.position, this.skillByType(SkillType.REST))
    }

    static spawn(position: TilePosition) {
        const monster = new Spider("spider", position, spiderStats)
        GameState.addMonster(monster);
    }

    static spawnAction() : Skill {
        const target: Target = new CombinedTarget().emptyTarget().inRange(1);
        const cost = CombinedCost.of(1);
        const effect = {
            applyEffect: (subject: Monster, target: TilePosition) => {
                Spider.spawn(target);
                GameState.map.tiles.get(target).slimed = true;
            }
        }
        return new Skill("spawn", undefined, ElementSignature.buildNeutral(), target, cost, effect, undefined, "spawn");
    }

}