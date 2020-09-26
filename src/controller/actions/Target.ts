import { distance } from "controller/map";
import { monsterAtPosition, tileAtPosition } from "controller/monster";
import { GameState } from "GameState";
import { Monster } from "model/Monster";
import { TilePosition } from "model/TilePosition";

export interface Target {
    validTarget(subject: Monster, position: TilePosition): boolean;
}

export class CombinedTarget implements Target {
    onMap: Target = {
        validTarget: (subject: Monster, position: TilePosition): boolean => {
            return GameState.map.tiles.get(position) != undefined;
        }
    }

    targets: Target[] = [this.onMap];
    validTarget(subject: Monster, position: TilePosition): boolean {
        return this.targets.every(target => target.validTarget(subject, position));
    }

    add(target: Target): CombinedTarget {
        this.targets.push(target);
        return this;
    }

    emptyTarget(): CombinedTarget {
        return this.add({
            validTarget: (subject: Monster, position: TilePosition): boolean => {
                return !monsterAtPosition(position);
            }
        });
    }

    enemyTarget(): CombinedTarget {
        return this.add({
            validTarget: (subject: Monster, position: TilePosition): boolean => {
                const target = monsterAtPosition(position);
                return target && target.friendly != subject.friendly;
            }
        });
    }


    inRange(maxDistance: number): CombinedTarget {
        return this.add({
            validTarget: (subject: Monster, position: TilePosition): boolean => {
                return distance(subject.position, position) <= maxDistance;
            }
        })
    }

    slimeStatus(slimed: boolean): CombinedTarget {
        return this.add({
            validTarget: (subject: Monster, position: TilePosition): boolean => {
                return tileAtPosition(position).slimed == slimed;
            }
        })
    }

    self(): Target {
        return this.add({
            validTarget: (subject: Monster, position: TilePosition): boolean => {
                return subject.position.isEqual(position);
            }
        })
    }



}