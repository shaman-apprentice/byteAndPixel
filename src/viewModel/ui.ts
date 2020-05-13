import * as PIXI from 'pixi.js';

import { SelectedMonsterInfo } from './SelectedMonsterInfo';
import { SelectedMonsterMarking } from './SelectedMonsterMarking';
import { GameState } from '../GameState';
import { EndTurnButton } from './EndTurnButton';
import { tileSize } from './Position';
import { StateChangeEvent } from '../controller/StateChangeEvent';
import { HashMap } from 'utils/HashMap';

export class Ui {
    boardContainer: PIXI.Container;
    statusContainer: PIXI.Container;

    monsterView: HashMap<number, PIXI.Container> = new HashMap(k => String(k));

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
        GameState.monsters.getValues().filter((monster) => !this.monsterView.has(monster.id)).forEach((monster) => {
            this.boardContainer.addChild(monster.pixiElem);
            this.monsterView.set(monster.id, monster.pixiElem);
        });

        this.monsterView.getEntries().filter((entry) => !GameState.monsters.has(entry.key)).forEach((entry) => {
            this.boardContainer.removeChild(entry.value);
            this.monsterView.delete(entry.key);
        });
    }
}
