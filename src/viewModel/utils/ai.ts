import { Monster } from "../Monster";
import { GameState } from "../../GameState";
import { Position } from "../Position";
import { distance, firstStep } from "./map";
import { MoveAction } from "../../controller/actions/MoveAction";
import { ChangeTileSlimeAction } from "../../controller/actions/ChangeTileSlimeAction";
import { AttackAction } from "../../controller/actions/AttackAction";
import { Action } from "../../controller/actions/Action";

export const enemyAction = (enemy: Monster) => {
    
    const targetMonster = closestMonster(enemy.position, Object.values(GameState.monsters).filter(monster => monster.friendly));
    if (!targetMonster) {
        enemy.actionPoints = 0;
        return;
    }

    while(enemy.actionPoints >= 1) {
        singleEnemyAction(enemy, targetMonster);
    }
}

const singleEnemyAction = (enemy: Monster, targetMonster) => {
    const stepPosition = enemy.position.add(firstStep(enemy.position, targetMonster.position))
    const actions: Action[] = [new AttackAction(enemy.id, stepPosition)
        , new ChangeTileSlimeAction(enemy.id, stepPosition, true)
    , new MoveAction(enemy.id, stepPosition)];

    //Does the first action possible
    const result = actions.find(action => action.execute());
    if (!result) {
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