import { TileMap } from './map'
import { Monster } from './monster'

export class GameState {
    private _map: TileMap
    private _monsters: Monster[]
    private _currentMonster: number

    constructor(map: TileMap, monsters: Monster[], currentMonster: number) {
        this._map = map;
        this._monsters = monsters;
        this._currentMonster = currentMonster;
    }

    get map(): TileMap {
        return this._map;
    }

    get monsters(): Monster[] {
        return this._monsters;
    }

    get currentMonster(): number {
        return this._currentMonster;
    }

    change(map: TileMap = this._map, monsters: Monster[] = this._monsters, currentMonster: number = this._currentMonster): GameState {
        return new GameState(map, monsters, currentMonster);
    }

    changeMonster(index: number, monster: Monster): GameState {
        let copiedMonsters = this._monsters.slice();
        copiedMonsters[index] = monster;
        return this.change(undefined, copiedMonsters, undefined);
    }
}