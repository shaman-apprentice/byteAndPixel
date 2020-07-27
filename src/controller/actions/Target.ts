import { Position } from "../../viewModel/Position";
import { Monster } from "viewModel/Monster";
import { monsterAtPosition, tileAtPosition } from "viewModel/utils/monster";
import { distance } from "viewModel/utils/map";
import { GameState } from "GameState";

export interface Target {
    validTarget(subject: Monster, position: Position): boolean;
}

export class CombinedTarget implements Target {

    onMap: Target = {
        validTarget: (subject: Monster, position: Position): boolean => {
            return GameState.map.tiles.get(position) != undefined;
        }
    }

    targets: Target[] = [this.onMap];
    validTarget(subject: Monster, position: Position): boolean {
        return this.targets.every(target => target.validTarget(subject, position));
    }

    add(target: Target): CombinedTarget {
        this.targets.push(target);
        return this;
    }

    emptyTarget(): CombinedTarget {
        return this.add({
            validTarget: (subject: Monster, position: Position): boolean => {
                return !monsterAtPosition(position);
            }
        });
    }

    enemyTarget(): CombinedTarget {
        return this.add({
            validTarget: (subject: Monster, position: Position): boolean => {
                const target = monsterAtPosition(position);
                return target && target.friendly != subject.friendly;
            }
        });
    }


    inRange(maxDistance: number): CombinedTarget {
        return this.add({
            validTarget: (subject: Monster, position: Position): boolean => {
                return distance(subject.position, position) <= maxDistance;
            }
        })
    }

    slimeStatus(slimed: boolean): CombinedTarget {
        return this.add({
            validTarget: (subject: Monster, position: Position): boolean => {
                return tileAtPosition(position).slimed == slimed;
            }
        })
    }



}