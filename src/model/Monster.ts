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
        public position: TilePosition,
        public body: number,
        public mind: number,
        public soul: number) { }

    public static fromStats(name: string, position: TilePosition, baseStats: MonsterStats, friendly: boolean = true) {
        const id = Monster.idCounter++;
        const elements = baseStats.elements;
        const actionPoints = new ValueWithRange(2, 2);
        const experiencePoints = new ValueWithRange(5, 0);
        const happiness = new ValueWithRange(100, 50);
        const skillList = Monster.getBaseSkills();
        const lastFight = 0;
        const body = baseStats.body;
        const mind = baseStats.mind;
        const soul = baseStats.soul;
        
        const energy = new ValueWithRange(Monster.calculateEnergy(soul))
        const hitPoints = new ValueWithRange(Monster.calculateHp(body));
        return new Monster(id, name, elements, actionPoints, energy, hitPoints, happiness, friendly, lastFight, experiencePoints, skillList, position, body, mind, soul)
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

        return new Monster(this.id, this.name, elements, actionPoints, energy, hitPoints, happiness, this.friendly, this.lastFight, experiencePoints, skillList, position, this.body, this.mind, this.soul);
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

    onTurnStart() {
        this.handlePassivHeal();

        this.actionPoints.setToMax();
        this.energy.current += 2;

        if (this.friendly) {
            this.handlehappiness();
            this.handleexperiencePoints();
        }
    }

    onStateChange() {
        this.hitPoints.max = Monster.calculateHp(this.body);
        this.energy.max = Monster.calculateEnergy(this.soul);
    }

    static calculateHp(body: number) {
        return 5 + body;
    }

    static calculateEnergy(soul: number) {
        return 30 + 5 * soul;
    }

    private handlePassivHeal() {
        if (GameState.turn - this.lastFight > 2) {
            this.hitPoints.add(1);
        }
    }

    private handleexperiencePoints() {
        if (this.experiencePoints.current == this.experiencePoints.max) {
            this.experiencePoints.current = 0;
            const skills = Skills.skillsByElement.get(this.elements.getElement());
            skills.find(skill => this.learnSkill(skill));
        } else {
            this.experiencePoints.current += 1;
        }
    }

    private handlehappiness() {
        const elementalNeighborhood = GameState.map.getElementsInNeighborhood(this.position);
        const unsatisfied = this.elements.sub(elementalNeighborhood).magnitude()
        if (unsatisfied > 0) {
            this.happiness.current -= unsatisfied;
        } else {
            this.happiness.current += 2;
        }
    }

}

export class MonsterStats {
    constructor(
        public elements: ElementSignature,
        public body: number,
        public mind: number,
        public soul: number) {
    }
}

