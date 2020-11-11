import { Enemy } from "./enemy";
import { GameState } from "GameState";
import { neighbors } from "controller/map";
import { Action } from "controller/actions/Action";
import { SkillAction } from "controller/actions/SkillAction";
import { SkillType } from "controller/skills/Skill";
import { Spider } from "./spider";
import { Monster } from "model/Monster";
import { TilePosition } from "model/TilePosition";
import { ValueWithRange } from "model/util/ValueWithRange";
import { BaseStats } from "model/modifiers";

export class Cave extends Enemy {
    cooldown = 0;

    aiAction: () => Action = () => {
        this.cooldown = ((this.cooldown + 1) % 3)
        var action: Action = undefined
        if (this.cooldown == 0) {
            action = this.spawnAction();
        }
        return action ? action : new SkillAction(this, this.position, this.skillByType(SkillType.REST))
    }

    deepClone(): Cave {
        const elements = this.elements.deepClone();
        const actionPoints = this.actionPoints.deepClone();
        const energy = this.energy.deepClone();
        const hitPoints = this.hitPoints.deepClone();
        const happiness = this.happiness.deepClone();
        const experiencePoints = this.experiencePoints.deepClone();
        const skillList = this.skillList.map(skill => skill.deepClone());
        const position = this.position.deepClone();
        const modifiers = this.modifiers.map(mod => mod.deepClone())

        return new Cave(this.id, this.name, this.baseStats, elements, actionPoints, energy, hitPoints, happiness, this.friendly, this.lastFight, experiencePoints, skillList, position, this.body, this.mind, this.soul, modifiers);
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

        return new Cave(id, name, baseStats, elements, actionPoints, energy, hitPoints, happiness, false, lastFight, experiencePoints, skillList, position, body, mind, soul, []);
    }

    spawnAction(): Action {
        const tiles = GameState.map.tiles;
        const monsters = GameState.monsters;
        const takenPositions = monsters.getValues().map(monster => monster.position)
        const spawnPosition = neighbors(this.position).filter(position => tiles.has(position)).find(position => !takenPositions.find(pos => position.isEqual(pos)));
        return new SkillAction(this, spawnPosition, Spider.spawnAction());
    }
}