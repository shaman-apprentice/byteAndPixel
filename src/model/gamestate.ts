import { TileMap } from './map'
import { Monster } from './monster'

export class GameState {
    private _map: TileMap
    private _monsters: Monster[]
    private _currentMonster: Monster

    constructor(map: TileMap, monsters: Monster[]) {
        this._map = map;
        this._monsters = monsters;
        this._currentMonster = monsters[0];

    }

    public get map(): TileMap {
        return this._map
    }

    public get monsters(): Monster[] {
        return this._monsters
    }

    public get currentMonster(): Monster {
        return this._currentMonster
    }
}