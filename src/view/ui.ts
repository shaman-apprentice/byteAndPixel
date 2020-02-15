import * as PIXI from 'pixi.js';
import { GameState } from "../model/gameState";
import { Position } from "../model/position";
import { TileView } from './tileView';
import { MonsterView } from './monsterView';
import { StateController } from '../controller/stateController';
import { SelectionView } from './selectionView';
import { DetailView } from './detailView';
import { createEndTurnAction } from '../model/action/action';

const tileSize: number = 64;

export class Ui {
    private static instance: Ui;
    static getInstance(): Ui {
        if (!Ui.instance) {
            Ui.instance = new Ui();
        }
        return Ui.instance;
    }


    boardContainer: PIXI.Container;
    guiContainer: PIXI.Container;
    tiles: TileView[][] = [];
    monsters: MonsterView[] = [];
    oldState: GameState;
    selectionView: SelectionView;
    detailView: DetailView;
    endTurnButton: PIXI.Text;

    createUi(state: GameState) {
        this.boardContainer = new PIXI.Container();
        this.guiContainer = new PIXI.Container();
        this.createBoard(state);
        this.createMonsters(state);
        this.createSelection(state);
        this.createEndTurnButton();

        this.boardContainer.position.set(tileSize, tileSize);
        this.oldState = state;
        StateController.getInstance().store.subscribe(this.onChange.bind(this))
    }

    private onChange() {
        let state = StateController.getInstance().store.getState();
        this.redrawBoard(state);
        this.redrawMonster(state);
        this.redrawSelection(state);
    }

    private redrawSelection(state: GameState) {
        this.selectionView.update(state);
        this.detailView.update(state);
    }

    private redrawBoard(state: GameState) {
        let size = state.map.tiles.length;
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                this.tiles[x][y].update(state.map.tiles[x][y])
            }
        }
    }

    private redrawMonster(state: GameState) {
        for (let i = 0; i < state.monsters.length; i++) {
            //TODO: cannot handle adding and removing monsters
            this.monsters[i].update(state.monsters[i]);
        }
    }

    private createSelection(state: GameState) {
        this.selectionView = new SelectionView(state, this.boardContainer);
        this.detailView = new DetailView(state, this.guiContainer)
    }

    private createMonsters(state: GameState) {
        for (let i = 0; i < state.monsters.length; i++) {
            this.monsters[i] = new MonsterView(state.monsters[i], this.boardContainer);
        }
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

    private createEndTurnButton() {
        this.endTurnButton = new PIXI.Text("End Turn");
        this.endTurnButton.position.set(600, 20);
        this.endTurnButton.interactive = true;
        this.endTurnButton.buttonMode = true;
        this.endTurnButton.on('click', () => StateController.getInstance().store.dispatch(createEndTurnAction()));
        this.guiContainer.addChild(this.endTurnButton);
    }

    static toDisplayCoords(x: number, y: number): Position {
        return {
            x: x * tileSize + y * tileSize / 2, 
            y: y * tileSize,
        };
    }

}
