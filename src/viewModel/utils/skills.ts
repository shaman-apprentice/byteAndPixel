import { HashMap } from "utils/HashMap";
import { Skill } from "../../controller/skills/Skill"
import { Element, ElementSignature } from "./Element";

export class Skills {

    static skills: HashMap<string, Skill> = Skills.initSkills();
    static skillsByElement: HashMap<Element, Skill[]> = Skills.initSkillsByElement();

    private static initSkills() {
        const map = new HashMap<string, Skill>(k => k)
        const skills = [
            this.buildSkill("default", ElementSignature.buildNeutral(), 1, 2, 1, "attack"),
            this.buildSkill("Throw Stone", ElementSignature.build(Element.Earth), 2, 4, 1, "earth"),
            this.buildSkill("Stonefist", ElementSignature.build(Element.Earth), 6, 6, 1, "earth"),
            this.buildSkill("Small Flame", ElementSignature.build(Element.Fire), 2, 5, 2, "fire"),
            this.buildSkill("Fireball", ElementSignature.build(Element.Fire), 7, 6, 1, "fire"),
            this.buildSkill("Snowflake", ElementSignature.build(Element.Ice), 1, 3, 1, "ice"),
            this.buildSkill("Frost", ElementSignature.build(Element.Ice), 4, 5, 1, "ice"),
            this.buildSkill("Breeze", ElementSignature.build(Element.Nature), 1, 1, 1, "nature"),
            this.buildSkill("Vines", ElementSignature.build(Element.Nature), 3, 6, 1, "nature"),
            this.buildSkill("Flying Screw", ElementSignature.build(Element.Metal), 3, 5, 1, "metal"),
            this.buildSkill("Iron Fist", ElementSignature.build(Element.Metal), 7, 10, 1, "metal"),
        ]
        skills.forEach(skill => map.set(skill.name, skill))
        return map;
    }

    private static buildSkill(name: string, element: ElementSignature, damage: number, energy: number, action: number, icon: string): Skill {
        return Skill.attackAction(name, element, damage, 1, action, energy, icon);
    }

    private static initSkillsByElement() {
        const map = new HashMap<Element, Skill[]>(k => k.toString());
        map.set(Element.Earth, [this.skills.get("Throw Stone"), this.skills.get("Stonefist")]);
        map.set(Element.Fire, [this.skills.get("Small Flame"), this.skills.get("Fireball")]);
        map.set(Element.Ice, [this.skills.get("Snowflake"), this.skills.get("Frost")]);
        map.set(Element.Nature, [this.skills.get("Breeze"), this.skills.get("Vines")]);
        map.set(Element.Metal, [this.skills.get("Flying Screw"), this.skills.get("Ironfist")]);
        return map;
    }

    static defaultAttack(): Skill {
        return this.skills.get("default");
    }
}