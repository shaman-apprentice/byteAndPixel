import { Monster } from "../Monster";
import { GameState } from "../../GameState";
import { Position } from "../Position";
import { distance, firstStep as stepOnPath } from "./map";
import { MoveAction } from "../../controller/MoveAction";
import { ChangeTileSlimeAction } from "../../controller/ChangeTileSlimeAction";
import { AttackAction } from "../../controller/AttackAction";

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
            new MoveAction(enemy.id, targetPosition).execute();
        } else {
            new ChangeTileSlimeAction(enemy.id, targetPosition, true).execute();
        }
    } else {
        new AttackAction(enemy.id, targetMonster.position).execute();
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