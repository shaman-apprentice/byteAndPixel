import * as PIXI from 'pixi.js';
import { GameState } from "../model/gameState";
import { Point } from "../model/position";
import { TileView } from './tileView';
import { MonsterView } from './monsterView';

const tileSize: number = 64;

export class Ui {
    boardContainer: PIXI.Container
    tiles: TileView[][] = [];
    monsters: MonsterView[] = [];


    static createUi(state: GameState): Ui {
        var ui: Ui = new Ui();
        ui.createUi(state);

        return ui;
    }

    private createUi(state: GameState) {
        this.boardContainer = new PIXI.Container();
        this.createBoard(state);
        this.createMonsters(state);

        this.boardContainer.position.set(tileSize, tileSize);
    }

    private createMonsters(state: GameState) {
        state.monsters.forEach(monster => new MonsterView(monster, this.boardContainer));
    }

    private createBoard(state: GameState) {
        let size = state.map.tiles.length;
        this.tiles = [];
        for (let x = 0; x < size; x++) {
            const row = [];
            for (let y = 0; y < size; y++) {
                let tileview = new TileView(state.map.tiles[x][y], this.boardContainer)
                row.push(tileview);
            }
            this.tiles.push(row);
        }
    }

    static toDisplayCoords(x: number, y: number): Point {
        return new Point(x * tileSize + y * tileSize / 2, y * tileSize);
    }

}
