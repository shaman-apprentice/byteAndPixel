import { ElementSignature } from '../../viewModel/utils/Element';
import { Cost, CombinedCost } from 'controller/actions/Cost';
import { Effect } from 'controller/actions/Effect';
import { Target, CombinedTarget } from 'controller/actions/Target';
import { Position } from "../../viewModel/Position";
import { Monster } from 'viewModel/Monster';
import { tileAtPosition, monsterAtPosition } from 'viewModel/utils/monster';
import { GameState } from 'GameState';

export enum SkillType {
    MOVE, CLEANSE, ATTACK
}

export class Skill {
    name: string;
    type: SkillType;
    elements: ElementSignature;
    target: Target;
    cost: Cost;
    effect: Effect;
    icon: string;

    constructor(name: string, type: SkillType, element: ElementSignature, target: Target, cost: Cost, effect: Effect, icon: string) {
        this.name = name;
        this.type = type;
        this.elements = element;
        this.cost = cost;
        this.effect = effect;
        this.target = target;
        this.icon = icon;
    }

    static walk(): Skill {
        const target: Target = new CombinedTarget().emptyTarget().inRange(1);
        const cost = CombinedCost.of(1, 4);
        const effect = {
            applyEffect: (subject: Monster, target: Position) => {
                subject.position = target;
            }
        }

        return new Skill("walk", SkillType.MOVE, ElementSignature.buildNeutral(), target, cost, effect, "walk");
    }

    //TODO: change range to 0
    static cleanse(): Skill {
        const target: Target = new CombinedTarget().slimeStatus(true).inRange(1);
        const cost = CombinedCost.of(1, 4, 10);
        const effect = {
            applyEffect: (subject: Monster, target: Position) => {
                tileAtPosition(target).slimed = false;
            }
        }

        return new Skill("cleanse", SkillType.CLEANSE, ElementSignature.buildNeutral(), target, cost, effect, "cleanse");
    }

    //TODO: change range to 0
    static slime(): Skill {
        const target: Target = new CombinedTarget().slimeStatus(false).inRange(1);
        const cost = CombinedCost.of(1, 4);
        const effect = {
            applyEffect: (subject: Monster, target: Position) => {
                tileAtPosition(target).slimed = true;
            }
        }

        return new Skill("slime", undefined, ElementSignature.buildNeutral(), target, cost, effect, "slime");
    }

    static attackAction(name: string, element: ElementSignature, damage: number, range: number, actionCost: number, energyCost): Skill {
        const target: Target = new CombinedTarget().enemyTarget().inRange(range);
        const cost = CombinedCost.of(actionCost, energyCost);
        const effect = {
            applyEffect: (subject: Monster, target: Position) => {
                const targetMonster = monsterAtPosition(target);
                targetMonster.hitPoints.sub(damage);
                subject.lastFight = GameState.turn;
                targetMonster.lastFight = GameState.turn;
                
                //TODO: move this die nonsense inside the monster class
                if (targetMonster.hitPoints.current <= 0) {
                    GameState.removeMonster(targetMonster);
                }
            }
        }

        return new Skill(name,SkillType.ATTACK, element, target, cost, effect, name);
    }

}

