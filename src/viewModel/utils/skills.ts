import { HashMap } from "utils/HashMap";
import { Skill } from "../Skill"
import { Element, ElementSignature } from "./Element";

export class Skills {

    static skills: HashMap<string, Skill> = Skills.initSkills();
    static baseSkills: HashMap<Element, Skill> = Skills.initBaseSkills();

    private static initSkills() {
        const map = new HashMap<string, Skill>(k => k)
        const skills = [
        new Skill("Throw Stone", ElementSignature.build(Element.Earth), 2, 1),
        new Skill("Stonefist", ElementSignature.build(Element.Earth), 6, 2),
        new Skill("Small Flame", ElementSignature.build(Element.Fire), 2, 1),
        new Skill("Fireball", ElementSignature.build(Element.Fire), 7, 3),
        new Skill("Snowflake", ElementSignature.build(Element.Ice), 1, 1),
        new Skill("Frost", ElementSignature.build(Element.Ice), 4, 2),
        new Skill("Breeze", ElementSignature.build(Element.Nature), 1, 1),
        new Skill("Vines", ElementSignature.build(Element.Nature), 3, 2),
        new Skill("Flying Screw", ElementSignature.build(Element.Metal), 3, 1),
        new Skill("Iron Fist", ElementSignature.build(Element.Metal), 7, 2),
        ]
        skills.forEach(skill => map.set(skill.name, skill))
        return map;
    }

    private static initBaseSkills() {
        const map = new HashMap<Element, Skill>(k => k.toString());
        map.set(Element.Earth, this.skills.get("Throw Stone"));
        map.set(Element.Fire, this.skills.get("Small Flame"));
        map.set(Element.Ice, this.skills.get("Snowflake"));
        map.set(Element.Nature, this.skills.get("Breeze"));
        map.set(Element.Metal, this.skills.get("Flying Screw"));
        return map;
    }

}