import { ElementSignature } from '../../model/Element';
import { Cost, CombinedCost, EnergyCost } from 'controller/actions/Cost';
import { Effect } from 'controller/actions/Effect';
import { Target, CombinedTarget } from 'controller/actions/Target';
import { GameState } from 'GameState';
import { SkillAnimation, MoveAnimation, AttackAnimation } from 'controller/actions/Animation';
import { TilePosition } from 'model/TilePosition';
import { Monster } from 'model/Monster';
import { monsterAtPosition, tileAtPosition } from 'controller/monster';

export enum SkillType {
    MOVE, CLEANSE, ATTACK, REST
}

export class Skill {

    constructor(
        public name: string,
        public type: SkillType,
        public elements: ElementSignature,
        public target: Target,
        public cost: Cost,
        public effect: Effect,
        public animation: SkillAnimation,
        public icon: string) { }

    public deepClone() {
        return new Skill(this.name, this.type, this.elements.deepClone(), this.target, this.cost, this.effect, this.animation, this.icon)
    }

    static walk(): Skill {
        const target: Target = new CombinedTarget().emptyTarget().inRange(1);
        const cost = CombinedCost.of(1, 4);
        const effect = {
            applyEffect: (subject: Monster, target: TilePosition) => {
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
            applyEffect: (subject: Monster, target: TilePosition) => {
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
            applyEffect: (subject: Monster, target: TilePosition) => {
                tileAtPosition(target).slimed = true;
            }
        }

        return new Skill("slime", undefined, ElementSignature.buildNeutral(), target, cost, effect, undefined, "slime");
    }

    static rest(): Skill {
        const target: Target = new CombinedTarget().self();
        const cost = EnergyCost.all();
        const effect = {
            applyEffect: (subject: Monster, target: TilePosition) => {
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
            applyEffect: (subject: Monster, target: TilePosition) => {
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

