import { Monster } from "../Monster";
import { Position } from "../Position";
import { distance } from "./map";

export const closestMonster = (position: Position, monsters: Monster[]): Monster => {
    var closest = undefined;
    var minDistance = Number.MAX_VALUE;

    monsters.forEach(monster => {
        const currentDistance = distance(position, monster.position)
        if (currentDistance < minDistance) {
            minDistance = currentDistance;
            closest = monster;
        }
    })

    return closest;
}