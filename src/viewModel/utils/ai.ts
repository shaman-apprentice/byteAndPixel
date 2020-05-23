import { Monster, BasicEnemy } from "../Monster";
import { GameState } from "../../GameState";
import { Position } from "../Position";
import { distance, firstStep, neighbors } from "./map";
import { MoveAction } from "../../controller/actions/MoveAction";
import { ChangeTileSlimeAction } from "../../controller/actions/ChangeTileSlimeAction";
import { AttackAction } from "../../controller/actions/AttackAction";
import { Action } from "../../controller/actions/Action";

export const basicAction = (enemy: Monster) => {
    
    const targetMonster = closestMonster(enemy.position, GameState.monsters.getValues().filter(monster => monster.friendly));
    if (!targetMonster) {
        enemy.actionPoints.current = 0;
        return;
    }

    while(enemy.actionPoints.current >= 1) {
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
        enemy.actionPoints.current = 0;
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

export const spawnAction = (monster: Monster) => {
    const tiles = GameState.map.tiles;
    const monsters = GameState.monsters;
    const takenPositions = monsters.getValues().map(monster => monster.position)
    const spawnPosition = neighbors(monster.position).filter(position => tiles.has(position)).find(position => !takenPositions.find(pos => position.isEqual(pos)));
    BasicEnemy.spawn(spawnPosition);
}