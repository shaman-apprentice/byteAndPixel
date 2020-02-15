import { AnyAction } from "redux";
import { GameState as GameState } from "../model/gameState";
import { TileMap } from "../model/map";
import { Monster } from "../model/monster";
import { Tile, TerrainType } from "../model/tile";
import { Position } from '../model/position';
import { MOVE, END_TURN, createSelectMonsterAction, createMoveAction, SELECT_MONSTER } from "../model/action/action";
import { isAdjacent, getMonsterAt } from "./tileHelper";
import { StateController } from "./stateController";

export class GameController {
    private static instance: GameController;
    static getInstance(): GameController {
        if (!GameController.instance) {
            GameController.instance = new GameController();
        }
        return this.instance;
    }

    initialState(): GameState {
        let tiles = this.generateTiles(8);
        let map = new TileMap(tiles)
        let appleman = new Monster("appleman", {x: 2, y: 2}, 2)
        let pixeldeer = new Monster("Pixeldeer",{x: 4, y: 1}, 2)
        let monsters: Monster[] = [appleman, pixeldeer]
        return new GameState(map, monsters, 0);
    }

    generateTiles(size: number): Tile[][] {
        let tiles: Tile[][] = [];
        for (let x = 0; x < size; x++) {
            const row: Tile[] = [];
            for (let y = 0; y < size; y++) {
                row.push({
                    terrainType: this.randomTerrainType(),
                    position: {x, y},
                });
            }
            tiles.push(row)
        }
        return tiles;
    }

    randomTerrainType(): TerrainType {
        const terrainTypes = Object.keys(TerrainType);
        const index = Math.floor(Math.random() * terrainTypes.length);
        return terrainTypes[index] as TerrainType;
    }

    computeAction(state: GameState = GameController.getInstance().initialState(), action: AnyAction): GameState {
        if (action.type == MOVE) {
            return this.computeMove(state, action);
        }
        if (action.type == END_TURN) {
            return this.endTurn(state);
        }
        if (action.type == SELECT_MONSTER) {
            return this.selectMonster(state, action);
        }

        return state;
    }

    onTileClicked(position: Position) {
        let state: GameState = StateController.getInstance().store.getState();
        let monsterAt = getMonsterAt(state, position)
        var action;
        if (monsterAt) {
            action = createSelectMonsterAction(state.monsters.indexOf(monsterAt));
        } else {
            action = createMoveAction(position);
        }

        StateController.getInstance().store.dispatch(action)
    }

    private computeMove(state: GameState, action: AnyAction): GameState {
        let index: number = state.currentMonster;
        let activeMonster: Monster = state.monsters[index];
        let moveTarget: Position = action.to;

        if (this.canMove(activeMonster, moveTarget)) {
            let movedMonster = activeMonster.change(undefined, moveTarget, activeMonster.actionPoints - 1);
            return state.changeMonster(index, movedMonster)
        } else {
            return state;
        }
    }

    private endTurn(state: GameState): GameState {
        let refreshedMonsters = state.monsters.map(monster => monster.change(undefined, undefined, 2));
        return state.change(undefined, refreshedMonsters, undefined);
    }

    private canMove(monster: Monster, target: Position): Boolean {
        return isAdjacent(monster.position, target) && monster.actionPoints >= 1;
    }

    private selectMonster(state: GameState, action: AnyAction): GameState {
        return state.change(undefined, undefined, action.index);
    }

}