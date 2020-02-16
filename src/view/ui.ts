import * as PIXI from 'pixi.js';
import { MonsterView } from './monsterView';
import { MapView } from './mapView';
import { SelectionView } from './selectionView';
import { SelectedMonsterDetailView } from './selectedMonsterDetailView';

export class Ui {
    boardContainer: PIXI.Container;
    statusContainer: PIXI.Container;

    constructor() {
        this.boardContainer = this.createBoardContainer();
        this.statusContainer = this.createStatusContainer();
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

        const selectionView = new SelectionView();
        boardContainer.addChild(selectionView.sprite);
        
        return boardContainer;
    }

    private createStatusContainer() {
        const statusContainer = new PIXI.Container();

        const selectedMonsterDetailView = new SelectedMonsterDetailView();
        statusContainer.addChild(selectedMonsterDetailView.textBox);

        return statusContainer;
    }
}
