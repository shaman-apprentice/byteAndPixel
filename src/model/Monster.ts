import { Skill, SkillType } from "controller/skills/Skill";
import { ValueWithRange } from "viewModel/utils/ValueWithRange";
import { ElementSignature } from "viewModel/utils/Element";
import { TilePosition } from "./TilePosition";
import { Skills } from "viewModel/utils/skills";
import { GameState } from "GameState";

export class Monster {
    
    private static idCounter = 0;
    public readonly id: number;
    name: string;
    elements: ElementSignature;
    actionPoints: ValueWithRange;
    energy: ValueWithRange;
    hitPoints: ValueWithRange;
    happiness: ValueWithRange;
    friendly: boolean;
    lastFight: number = 0;
    experiencePoints: ValueWithRange;
    skillList: Skill[];
    position: TilePosition;

    constructor(name: string, position: TilePosition, baseStats: MonsterStats, friendly: boolean = true) {
        this.id = Monster.idCounter++;
        this.name = name;
        this.friendly = friendly;
        this.position = position;
        this.elements = baseStats.elements;
        this.actionPoints = new ValueWithRange(baseStats.actionPoints);
        this.energy = new ValueWithRange(baseStats.energy)
        this.hitPoints = new ValueWithRange(baseStats.hp);
        this.experiencePoints = new ValueWithRange(5, 0);
        this.happiness = new ValueWithRange(100, 50);
        this.skillList = this.getBaseSkills();
    }

    private getBaseSkills() {
        return [Skills.defaultAttack(), Skill.walk(), Skill.cleanse(), Skill.rest()];
    }

    learnSkill(skill: Skill) {
        if (!(this.skillList.map((s) => s.name).includes(skill.name))) {
            this.skillList.push(skill);
        }
    }

    skillByType(skilltype: SkillType, index : number = 0) : Skill {
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

