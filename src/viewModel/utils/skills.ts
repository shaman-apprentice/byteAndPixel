import { HashMap } from "utils/HashMap";
import { Skill } from "../../controller/skills/Skill"
import { Element, ElementSignature } from "./Element";

export class Skills {
    
    static skills: HashMap<string, Skill> = Skills.initSkills();
    static baseSkills: HashMap<Element, Skill> = Skills.initBaseSkills();
    
    private static initSkills() {
        const map = new HashMap<string, Skill>(k => k)
        const skills = [
            new Skill("default", ElementSignature.buildNeutral(), 1, 2, 1),
            new Skill("Throw Stone", ElementSignature.build(Element.Earth), 2, 4, 1),
            new Skill("Stonefist", ElementSignature.build(Element.Earth), 6, 6, 1 ),
            new Skill("Small Flame", ElementSignature.build(Element.Fire), 2, 5, 2),
            new Skill("Fireball", ElementSignature.build(Element.Fire), 7, 6, 1),
            new Skill("Snowflake", ElementSignature.build(Element.Ice), 1, 3, 1),
            new Skill("Frost", ElementSignature.build(Element.Ice), 4, 5, 1),
            new Skill("Breeze", ElementSignature.build(Element.Nature), 1, 1, 1),
            new Skill("Vines", ElementSignature.build(Element.Nature), 3, 6, 1),
            new Skill("Flying Screw", ElementSignature.build(Element.Metal), 3, 5, 1),
            new Skill("Iron Fist", ElementSignature.build(Element.Metal), 7, 10, 1),
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
    
    static defaultAttack(): Skill {
        return this.skills.get("default");
    }
}