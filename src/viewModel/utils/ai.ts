import { distance } from "./map";
import { Monster } from "model/Monster";
import { TilePosition } from "model/TilePosition";

export const closestMonster = (position: TilePosition, monsters: Monster[]): Monster => {
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