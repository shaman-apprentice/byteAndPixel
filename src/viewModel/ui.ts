import * as PIXI from 'pixi.js';

import { SelectedMonsterInfo } from './SelectedMonsterInfo';
import { SelectedMonsterMarking } from './SelectedMonsterMarking';
import { GameState } from '../GameState';
import { EndTurnButton } from './EndTurnButton';
import { tileSize } from './Position';
import { MonsterAddEvent } from '../controller/MonsterAddEvent';
import { MonsterRemoveEvent } from '../controller/MonsterRemoveEvent';
import { Monster } from './Monster';

export class Ui {
    boardContainer: PIXI.Container;
    statusContainer: PIXI.Container;

    constructor() {
        this.boardContainer = this.createBoardContainer();
        this.statusContainer = this.createStatusContainer();

        GameState.monsters.forEach(monster => this.addMonster(monster))

        GameState.emitter.addEventListener(MonsterAddEvent.type,
          (event: CustomEvent) => { this.addMonster(event.detail); });
        GameState.emitter.addEventListener(MonsterRemoveEvent.type,
          (event: CustomEvent) => { this.removeMonster(event.detail); });
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

    private addMonster(monster: Monster) {
        this.boardContainer.addChild(monster.pixiElem);
    }

    private removeMonster(monster: Monster) {
        this.boardContainer.removeChild(monster.pixiElem);
    }
}
