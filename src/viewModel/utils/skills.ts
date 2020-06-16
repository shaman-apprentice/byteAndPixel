import { HashMap } from "utils/HashMap";
import {Skill} from "../Skill"
import { ElementSignature } from "./Element";

export const skillMap = () : HashMap<number, Skill> => {
    const map = new HashMap<number, Skill>(k=>String(k));
    return map;
}

export const initiateSkills = (): HashMap<number, Skill> =>{
    const skills = [throwStone, stonefist, smallFlame, fireball, snowflake, frost, breeze, vines, flyingScrew, ironfist];
    const map = new HashMap<number, Skill>(k => String(k));
    skills.forEach(skill => map.set(skill.id, skill));
    return map;
}

export const baseSkill=(element: ElementSignature)=>{
    switch(element){
        case  earth:
            return throwStone;
            
        case fire:
            return smallFlame;
            
        case ice:
            return snowflake;
            
        case nature:
            return breeze;
        
        case metal:
            return flyingScrew;
    }
}

const earth: ElementSignature = new ElementSignature(1, 0, 0, 0, 0);
const fire: ElementSignature = new ElementSignature(0, 1, 0, 0, 0);
const ice: ElementSignature = new ElementSignature(0, 0, 1, 0, 0);
const nature: ElementSignature = new ElementSignature(0, 0, 0, 1, 0);
const metal: ElementSignature = new ElementSignature(0, 0, 0, 0, 1);

const throwStone = new Skill("Throw Stone", new ElementSignature(1,0,0,0,0), 2, 1);
const stonefist = new Skill("Stonefist", new ElementSignature(1,0,0,0,0), 6, 2)
const smallFlame = new Skill("Small Flame", new ElementSignature(0,1,0,0,0), 2, 1);
const fireball = new Skill("Fireball", new ElementSignature(0,1,0,0,0), 7, 3);
const snowflake = new Skill("Snowflake", new ElementSignature(0,0,1,0,0), 1, 1);
const frost = new Skill("Frost", new ElementSignature(0,0,1,0,0), 4, 2); //maybe develop into an AOE and highten the cost
const breeze = new Skill("Breeze", new ElementSignature(0,0,0,1,0), 1, 1);
const vines = new Skill("Vines", new ElementSignature(0,0,0,1,0), 3, 2); //maybe add a debuff to slow/poison/etc. the enemy
const flyingScrew = new Skill("Flying Screw", new ElementSignature(0,0,0,0,1), 3, 1);
const ironfist = new Skill("Iron Fist", new ElementSignature(0,0,0,0,1), 7, 2);