import { TileMap } from './map'
import { Monster } from './monster'

export class GameState {
    map: TileMap
    monsters: Monster[]
    currentMonster: number

    constructor(map: TileMap, monsters: Monster[]) {
        this.map = map;
        this.monsters = monsters;
        this.currentMonster = 0;

    }
}