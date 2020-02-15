import { Position } from "../model/position";
import { GameState } from "../model/gameState";
import { Monster } from "../model/monster";

export function isAdjacent(a: Position, b: Position): boolean {
    let {x: x1,y: y1} = a;
    let {x: x2,y: y2} = b;

    const neighbors = [
        [x1+1, y1],
        [x1-1, y1],
        [x1, y1+1],
        [x1, y1-1],
        [x1+1, y1-1],
        [x1-1, y1+1],
    ];
    const neighbor = neighbors.find(([x, y]) => x === x2 && y === y2);
    return Boolean(neighbor);
}

export function getMonsterAt(state: GameState, position : Position): Monster {
    var result = state.monsters.find(monster => {
        //I do not know why monster.position===position fails here
        return monster.position.x == position.x && monster.position.y == position.y;
    });
    return result;
}