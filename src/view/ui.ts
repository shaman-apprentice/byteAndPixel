import * as PIXI from 'pixi.js';
import { MonsterView } from './monsterView';
import { MapView } from './mapView';

export class Ui {
    boardContainer: PIXI.Container;
    // guiContainer: PIXI.Container;

    constructor() {
        this.boardContainer = this.createBoardContainer();
        // this.guiContainer = new PIXI.Container();
    }

    private createBoardContainer() {
        const boardContainer = new PIXI.Container();

        const mapView = new MapView();
        mapView.tiles.forEach(row => {
            row.forEach(tileSprite => {
                boardContainer.addChild(tileSprite)
            })
        });

        const monsterView = new MonsterView();
        Object.values(monsterView.monsters).forEach(monsterSprite =>
            boardContainer.addChild(monsterSprite));

        return boardContainer;
    }
}
