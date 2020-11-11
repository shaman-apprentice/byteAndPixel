import { Enemy } from "./enemy";
import { GameState } from "GameState";
import { closestMonster } from "../../controller/ai";
import { firstStep } from "controller/map";
import { Action } from "controller/actions/Action";
import { SkillAction } from "controller/actions/SkillAction";
import { Skill, SkillType } from "controller/skills/Skill";
import { Target, CombinedTarget } from "controller/actions/Target";
import { CombinedCost } from "controller/actions/Cost";
import { ElementSignature } from "model/Element";
import { Monster } from "model/Monster";
import { TilePosition } from "model/TilePosition";
import { spiderStats } from "controller/monster";
import { ValueWithRange } from "model/util/ValueWithRange";
import { BaseStats } from "model/modifiers";

export class Spider extends Enemy {
    aiAction: () => Action = () => {

        const targetMonster = closestMonster(this.position, GameState.monsters.getValues().filter(monster => monster.friendly));
        if (!targetMonster) {
            this.actionPoints.current = 0;
            return new SkillAction(this, this.position, this.skillByType(SkillType.REST));
        }

        return this.singleAction(targetMonster);
    }

    static fromStats(name: string, position: TilePosition, baseStats: BaseStats) {
        const id = Monster.idCounter++;
        const elements = baseStats.elements;
        const actionPoints = new ValueWithRange(1, 1);
        const experiencePoints = new ValueWithRange(5, 0);
        const happiness = new ValueWithRange(100, 50);
        const skillList = Monster.getBaseSkills();
        const lastFight = 0;
        const body = baseStats.body;
        const mind = baseStats.mind;
        const soul = baseStats.soul;

        const energy = new ValueWithRange(baseStats.baseEnergy)
        const hitPoints = new ValueWithRange(baseStats.baseHitPoints);

        return new Spider(id, name, baseStats, elements, actionPoints, energy, hitPoints, happiness, false, lastFight, experiencePoints, skillList, position, body, mind, soul, []);
    }

    deepClone(): Spider {
        const elements = this.elements.deepClone();
        const actionPoints = this.actionPoints.deepClone();
        const energy = this.energy.deepClone();
        const hitPoints = this.hitPoints.deepClone();
        const happiness = this.happiness.deepClone();
        const experiencePoints = this.experiencePoints.deepClone();
        const skillList = this.skillList.map(skill => skill.deepClone());
        const position = this.position.deepClone();
        const modifiers = this.modifiers.map(mod => mod.deepClone())

        return new Spider(this.id, this.name, this.baseStats, elements, actionPoints, energy, hitPoints, happiness, this.friendly, this.lastFight, experiencePoints, skillList, position, this.body, this.mind, this.soul, modifiers);
    }

    singleAction(targetMonster: Monster): Action {
        const stepPosition = this.position.add(firstStep(this.position, targetMonster.position))
        const actions: Action[] = [new SkillAction(this, stepPosition, this.skillList[0])
            , new SkillAction(this, stepPosition, Skill.slime())
            , new SkillAction(this, stepPosition, Skill.walk())];

        //Does the first action possible
        const result = actions.find(action => action.canExecute());
        return result ? result : new SkillAction(this, this.position, this.skillByType(SkillType.REST))
    }

    static spawn(position: TilePosition) {
        const monster = Spider.fromStats("spider", position, spiderStats)
        GameState.addMonster(monster);
    }

    static spawnAction(): Skill {
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