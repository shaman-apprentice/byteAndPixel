import { ElementSignature } from '../../viewModel/utils/Element';
import { Cost, CombinedCost, EnergyCost } from 'controller/actions/Cost';
import { Effect } from 'controller/actions/Effect';
import { Target, CombinedTarget } from 'controller/actions/Target';
import { Position } from "../../viewModel/Position";
import { Monster } from 'viewModel/Monster';
import { tileAtPosition, monsterAtPosition } from 'viewModel/utils/monster';
import { GameState } from 'GameState';
import { SkillAnimation, MoveAnimation, AttackAnimation } from 'controller/actions/Animation';

export enum SkillType {
    MOVE, CLEANSE, ATTACK, REST
}

export class Skill {
    name: string;
    type: SkillType;
    elements: ElementSignature;
    target: Target;
    cost: Cost;
    effect: Effect;
    animation: SkillAnimation;
    icon: string;

    constructor(name: string, type: SkillType, element: ElementSignature, target: Target, cost: Cost, effect: Effect, animation: SkillAnimation, icon: string) {
        this.name = name;
        this.type = type;
        this.elements = element;
        this.cost = cost;
        this.effect = effect;
        this.target = target;
        this.animation = animation;
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
        const animation = new MoveAnimation();

        return new Skill("walk", SkillType.MOVE, ElementSignature.buildNeutral(), target, cost, effect, animation, "walk");
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

        return new Skill("cleanse", SkillType.CLEANSE, ElementSignature.buildNeutral(), target, cost, effect, undefined, "cleanse");
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

        return new Skill("slime", undefined, ElementSignature.buildNeutral(), target, cost, effect, undefined, "slime");
    }

    static rest(): Skill {
        const target: Target = new CombinedTarget().self();
        const cost = EnergyCost.all();
        const effect = {
            applyEffect: (subject: Monster, target: Position) => {
                const scale = subject.actionPoints.current;
                subject.energy.add(scale * 5);
                subject.actionPoints.setToMin();
            }
        }

        return new Skill("rest", SkillType.REST, ElementSignature.buildNeutral(), target, cost, effect, undefined, "rest");
    }

    static attackAction(name: string, element: ElementSignature, damage: number, range: number, actionCost: number, energyCost, icon: string): Skill {
        const target: Target = new CombinedTarget().enemyTarget().inRange(range);
        const cost = CombinedCost.of(actionCost, energyCost);
        const effect = {
            applyEffect: (subject: Monster, target: Position) => {
                const targetMonster = monsterAtPosition(target);
                targetMonster.takeDamage(damage);
                subject.lastFight = GameState.turn;
                targetMonster.lastFight = GameState.turn;
            }
        }
        const animation = new AttackAnimation();

        return new Skill(name,SkillType.ATTACK, element, target, cost, effect, animation, icon);
    }

}

