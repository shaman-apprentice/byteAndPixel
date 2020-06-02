import * as PIXI from 'pixi.js';

import { SelectedMonsterInfo } from './SelectedMonsterInfo';
import { SelectedMonsterMarking } from './SelectedMonsterMarking';
import { GameState } from '../GameState';
import { EndTurnButton } from './EndTurnButton';
import { tileSize, Position } from './Position';
import { MonsterAddEvent } from '../controller/events/MonsterAddEvent';
import { MonsterRemoveEvent } from '../controller/events/MonsterRemoveEvent';
import { Monster } from './Monster';
import { ActionPreviewMarking } from './ActionPreviewMarking';
import { MapMoveEvent } from 'controller/events/MapMoveEvent';
import { Design } from './Design';

export class Ui {
    boardContainer: PIXI.Container;
    statusContainer: PIXI.Container;
    monsterContainer: PIXI.Container;
    middleGroundContainer: PIXI.Container;

    constructor() {
        this.monsterContainer = new PIXI.Container();
        this.boardContainer = this.createBoardContainer();
        this.statusContainer = this.createStatusContainer();
        this.middleGroundContainer = this.createMiddleGroundContainer();

        GameState.monsters.forEach(monster => this.addMonster(monster))

        GameState.emitter.addEventListener(MonsterAddEvent.type,
            (event: CustomEvent) => { this.addMonster(event.detail); });
        GameState.emitter.addEventListener(MonsterRemoveEvent.type,
            (event: CustomEvent) => { this.removeMonster(event.detail); });
        GameState.emitter.addEventListener(MapMoveEvent.type, 
            (event: CustomEvent) => { this.mapMoved(event.detail) })
    }

    private createBoardContainer() {
        const boardContainer = new PIXI.Container();

        boardContainer.addChild(GameState.map.pixiElem);
        boardContainer.addChild(new SelectedMonsterMarking().pixiElem);
        boardContainer.addChild(this.monsterContainer);
        boardContainer.addChild(new ActionPreviewMarking().pixiElem);

        boardContainer.position.set(tileSize / 2, tileSize / 2);
        return boardContainer;
    }

    private createStatusContainer() {
        const statusContainer = new PIXI.Container();

        statusContainer.addChild(new SelectedMonsterInfo().pixiElem);
        statusContainer.addChild(new EndTurnButton().pixiElem);

        return statusContainer;
    }

    private createMiddleGroundContainer(){
        const middleGroundContainer = new PIXI.Container();

        middleGroundContainer.addChild(new Design("test", "Assets/Images/Ranke.png").pixiElem);

        return middleGroundContainer;
    }

    private addMonster(monster: Monster) {
        this.monsterContainer.addChild(monster.pixiElem);
    }

    private removeMonster(monster: Monster) {
        this.monsterContainer.removeChild(monster.pixiElem);
    }

    private mapMoved(delta: {x:number, y:number}) {
        this.boardContainer.position.x += delta.x;
        this.boardContainer.position.y += delta.y;
    }
}
