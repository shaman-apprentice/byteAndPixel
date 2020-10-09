import { Skill, SkillType } from "controller/skills/Skill";
import { ValueWithRange } from "model/ValueWithRange";
import { ElementSignature } from "model/Element";
import { TilePosition } from "./TilePosition";
import { Skills } from "controller/skills";
import { GameState } from "GameState";

export class Monster {
    protected static idCounter = 0;

    constructor(
        public readonly id: number,
        public name: string,
        public elements: ElementSignature,
        public actionPoints: ValueWithRange,
        public energy: ValueWithRange,
        public hitPoints: ValueWithRange,
        public happiness: ValueWithRange,
        public friendly: boolean,
        public lastFight: number,
        public experiencePoints: ValueWithRange,
        public skillList: Skill[],
        public position: TilePosition) { }

    public static fromStats(name: string, position: TilePosition, baseStats: MonsterStats, friendly: boolean = true) {
        const id = Monster.idCounter++;
        const elements = baseStats.elements;
        const actionPoints = new ValueWithRange(baseStats.actionPoints);
        const energy = new ValueWithRange(baseStats.energy)
        const hitPoints = new ValueWithRange(baseStats.hp);
        const experiencePoints = new ValueWithRange(5, 0);
        const happiness = new ValueWithRange(100, 50);
        const skillList = Monster.getBaseSkills();
        const lastFight = 0;

        return new Monster(id, name, elements, actionPoints, energy, hitPoints, happiness, friendly, lastFight, experiencePoints, skillList, position)
    }

    protected static getBaseSkills() {
        return [Skills.defaultAttack(), Skill.walk(), Skill.cleanse(), Skill.rest()];
    }

    deepClone(): Monster {
        const elements = this.elements.deepClone();
        const actionPoints = this.actionPoints.deepClone();
        const energy = this.energy.deepClone();
        const hitPoints = this.hitPoints.deepClone();
        const happiness = this.happiness.deepClone();
        const experiencePoints = this.experiencePoints.deepClone();
        const skillList = this.skillList.map(skill => skill.deepClone());
        const position = this.position.deepClone();

        return new Monster(this.id, this.name, elements, actionPoints, energy, hitPoints, happiness, this.friendly, this.lastFight, experiencePoints, skillList, position);
    }


    learnSkill(skill: Skill) {
        if (!(this.skillList.map((s) => s.name).includes(skill.name))) {
            this.skillList.push(skill);
        }
    }

    skillByType(skilltype: SkillType, index: number = 0): Skill {
        return this.skillList.filter((skill) => skill.type == skilltype)[index];
    }

    takeDamage(damage: number) {
        this.hitPoints.sub(damage);
        if (this.hitPoints.current <= 0) {
            GameState.removeMonster(this);
        }
    }
}

export class MonsterStats {
    elements: ElementSignature;
    hp: number;
    energy: number;
    actionPoints: number;
    xp: number;

    constructor(elements: ElementSignature, hp: number, energy: number, actionPoints: number) {
        this.elements = elements;
        this.hp = hp;
        this.energy = energy;
        this.actionPoints = actionPoints;
    }
}

