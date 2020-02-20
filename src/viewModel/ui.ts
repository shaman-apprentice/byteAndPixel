import * as PIXI from 'pixi.js';

import { SelectedMonsterInfo } from './SelectedMonsterInfo';
import { SelectedMonsterMarking } from './SelectedMonsterMarking';
import { GameState } from '../GameState';

export class Ui {
    boardContainer: PIXI.Container;
    statusContainer: PIXI.Container;

    constructor() {
        this.boardContainer = this.createBoardContainer();
        this.statusContainer = this.createStatusContainer();
    }

    private createBoardContainer() {
        const boardContainer = new PIXI.Container();

        boardContainer.addChild(GameState.map.pixiElem);

        Object.values(GameState.monsters)
            .forEach(m => boardContainer.addChild(m.pixiElem));

        boardContainer.addChild(new SelectedMonsterMarking(0).pixiElem);
        
        return boardContainer;
    }

    private createStatusContainer() {
        const statusContainer = new PIXI.Container();

        statusContainer.addChild(new SelectedMonsterInfo(0).pixiElem);

        return statusContainer;
    }
}
