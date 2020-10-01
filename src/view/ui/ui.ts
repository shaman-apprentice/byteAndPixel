import * as PIXI from 'pixi.js';

import { SelectedMonsterMarking } from './SelectedMonsterMarking';
import { GameState } from '../../GameState';
import { EndTurnButton } from '../../view/ui/buttons/EndTurnButton';
import { MonsterAddEvent } from '../../controller/events/MonsterAddEvent';
import { MonsterRemoveEvent } from '../../controller/events/MonsterRemoveEvent';
import { MapMoveEvent } from 'controller/events/MapMoveEvent';
import { ActiveMonsterInfo } from '../../view/ui/MonsterInfo/ActiveMonsterInfo';
import { ActionUI } from './ActionUi';
import { HideButton } from '../../view/ui/buttons/hideButton';
import { Design } from './Design';
import { tileSize } from 'model/TilePosition';
import { MonsterView } from 'view/MonsterView';
import { Monster } from 'model/Monster';
import { HashMap } from 'utils/HashMap';
import { TileMapView } from './TileMapView';

export class Ui {
    static emitter = Ui.initialize();
    static monsters: HashMap<Monster, MonsterView>  = new HashMap<Monster, MonsterView>((monster: Monster) => monster ? monster.id.toString() : undefined);
    static tileMapView: TileMapView;
    static boardContainer: PIXI.Container = new PIXI.Container();
    static statusContainer: PIXI.Container  = new PIXI.Container();
    static monsterContainer: PIXI.Container = new PIXI.Container();;
    static middleGroundContainer: PIXI.Container = new PIXI.Container();

    static build () {
        this.boardContainer.removeChildren();
        this.statusContainer.removeChildren();
        this.monsterContainer.removeChildren();
        this.middleGroundContainer.removeChildren();
        this.monsters.deleteAll();

        this.createMonsterContainer();
        this.createBoardContainer();
        this.createStatusContainer();
        this.createMiddleGroundContainer();
    }

    static initialize() {
        GameState.emitter.addEventListener(MonsterAddEvent.type,
            (event: CustomEvent) => { this.addMonster(event.detail); });
        GameState.emitter.addEventListener(MonsterRemoveEvent.type,
            (event: CustomEvent) => { this.removeMonster(event.detail); });
        GameState.emitter.addEventListener(MapMoveEvent.type, 
            (event: CustomEvent) => { this.mapMoved(event.detail) })
    }

    private static createBoardContainer() {
        this.tileMapView = new TileMapView(GameState.map);

        this.boardContainer.addChild(this.tileMapView.pixiElem);
        this.boardContainer.addChild(new SelectedMonsterMarking().pixiElem);
        this.boardContainer.addChild(this.monsterContainer);
        this.boardContainer.addChild(new ActionUI().pixiElem);

        this.boardContainer.position.set(tileSize / 2, tileSize / 2);
    }

    private static createStatusContainer() {
        this.statusContainer.addChild(new ActiveMonsterInfo().pixiElem); 
        this.statusContainer.addChild(new EndTurnButton().pixiElem);
        this.statusContainer.addChild(new HideButton().pixiElem);
    }

    private static createMiddleGroundContainer(){
        this.middleGroundContainer.addChild(new Design("Assets/Images/Ranke.png").pixiElem);
    }

    private static createMonsterContainer() {
        GameState.monsters.forEach(monster => this.addMonster(monster))
    }

    private static addMonster(monster: Monster) {
        const monsterView = new MonsterView(monster);
        this.monsterContainer.addChild(monsterView.pixiElem);
        this.monsters.set(monster, monsterView);
    }

    private static removeMonster(monster: Monster) {
        const monsterView = this.monsters.get(monster)
        this.monsterContainer.removeChild(monsterView.pixiElem);
        this.monsters.delete(monster);
    }

    private static mapMoved(delta: {x:number, y:number}) {
        this.boardContainer.position.x += delta.x;
        this.boardContainer.position.y += delta.y;
    }

    public static getMonsterView(monster: Monster) : MonsterView {
        if (!monster) {
            undefined;
        }
        return this.monsters.get(monster);
    }
}
