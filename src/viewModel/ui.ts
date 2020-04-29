import * as PIXI from 'pixi.js';

import { SelectedMonsterInfo } from './SelectedMonsterInfo';
import { SelectedMonsterMarking } from './SelectedMonsterMarking';
import { GameState } from '../GameState';
import { EndTurnButton } from './EndTurnButton';
import { tileSize } from './Position';
import { StateChangeEvent } from '../controller/StateChangeEvent';

export class Ui {
    boardContainer: PIXI.Container;
    statusContainer: PIXI.Container;

    monsterView: { [key: number]: PIXI.Container } = {};

    constructor() {
        this.boardContainer = this.createBoardContainer();
        this.statusContainer = this.createStatusContainer();

        this.updateMonsterView();
        GameState.emitter.addEventListener(StateChangeEvent.type,
          () => { this.updateMonsterView(); });
    }

    private createBoardContainer() {
        const boardContainer = new PIXI.Container();

        boardContainer.addChild(GameState.map.pixiElem);

        boardContainer.addChild(new SelectedMonsterMarking().pixiElem);
        
        boardContainer.position.set(tileSize/2, tileSize/2);
        return boardContainer;
    }

    private createStatusContainer() {
        const statusContainer = new PIXI.Container();

        statusContainer.addChild(new SelectedMonsterInfo().pixiElem);
        statusContainer.addChild(new EndTurnButton().pixiElem);

        return statusContainer;
    }

    private updateMonsterView() {
        const monsters = GameState.monsters;

        Object.entries(monsters).filter(([id, monster]) => !this.monsterView.hasOwnProperty(id)).forEach(([id, monster]) => {
            this.boardContainer.addChild(monster.pixiElem);
            this.monsterView[id] = monster.pixiElem;
        });

        Object.entries(this.monsterView).filter(([id, monsterView]) => !monsters.hasOwnProperty(id)).forEach(([id, monsterView]) => {
            this.boardContainer.removeChild(monsterView);
            delete this.monsterView[id];
        });
    }
}
