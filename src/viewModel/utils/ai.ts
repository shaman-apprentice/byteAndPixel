import { Monster } from "../Monster";
import { GameState } from "../../GameState";
import { Position } from "../Position";
import { distance, firstStep as stepOnPath } from "./map";
import { MonsterMoveAction } from "../../controller/MonsterMoveAction";
import { ChangeTileSlimeAction } from "../../controller/ChangeTileSlimeAction";

export const enemyAction = (enemy: Monster) => {
    const targetMonster = closestMonster(enemy.position, Object.values(GameState.monsters).filter(monster => monster.friendly));
    if (!targetMonster) {
        enemy.actionPoints = 0;
        return;
    }

    if (distance(enemy.position, targetMonster.position) > 1) {
        const direction = stepOnPath(enemy.position, targetMonster.position);
        const targetPosition = enemy.position.add(direction);
        const targetTile = GameState.map.tiles[targetPosition.x][targetPosition.y];
        if ( targetTile.slimed ) {
            new MonsterMoveAction(enemy.id, targetPosition).execute();
        } else {
            new ChangeTileSlimeAction(enemy.id, targetPosition, true).execute();
        }
    } else {
        enemy.actionPoints = 0;
    }
}

const closestMonster = (position: Position, monsters: Monster[]): Monster => {
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