import * as _ from "lodash";
import { TileMap } from './model/TileMap';
import { MonsterAddEvent } from 'controller/events/MonsterAddEvent';
import { MonsterRemoveEvent } from 'controller/events/MonsterRemoveEvent';
import { SelectedMonsterChangedEvent } from 'controller/events/SelectedMonsterChangedEvent';
import { Monster } from 'model/Monster';
import { getInitialMonsters, Monsters } from 'controller/monster';
import { Ui } from "view/ui/ui";
import { StateChangeEvent } from "controller/events/StateChangeEvent";

export class GameState {
  private static _instance: GameState = new GameState(TileMap.randomInitialization(16), getInitialMonsters(), 1, undefined, undefined);
  private static _saveState = undefined;
  public static emitter = new EventTarget();

  constructor(
    private _map: TileMap,
    private _monsters: Monsters,
    private _turn: number,
    private _selectedMonster: Monster,
    private _prevState: GameState) {
  }

  static set map(map: TileMap) {
    GameState._instance._map = map;
  }

  static get map() {
    return GameState._instance._map;
  }

  static set monsters(monsters: Monsters) {
    GameState._instance._monsters = monsters;
  }

  static get monsters() {
    return GameState._instance._monsters;
  }

  static set turn(turn: number) {
    GameState._instance._turn = turn;
  }

  static get turn() {
    return GameState._instance._turn;
  }

  static set selectedMonster(monster: Monster) {
    GameState._instance._selectedMonster = monster;
    SelectedMonsterChangedEvent.dispatch(monster);
  }

  static get selectedMonster() {
    return GameState._instance._selectedMonster;
  }

  static addMonster(monster: Monster) {
    GameState.monsters.set(monster.id, monster);
    MonsterAddEvent.dispatch(monster);
  }

  static removeMonster(monster: Monster) {
    GameState.monsters.delete(monster.id);
    MonsterRemoveEvent.dispatch(monster);
    if (GameState.selectedMonster?.id == monster.id) {
      GameState.selectedMonster = GameState.monsters.getValues().find(candiate => candiate.friendly && candiate.id != monster.id)
    }
  }

  static cloneState() {
    const current = GameState._instance;
    const clonedMap = current._map.deepClone();
    const clonedMonster = current._monsters.deepClone();
    const clonedSelectedMonster = clonedMonster.get(current._selectedMonster.id);
    return new GameState(clonedMap, clonedMonster, current._turn, clonedSelectedMonster, current._prevState)
  }

  static save() {
    GameState._saveState = GameState.cloneState();
  }

  static load() {
    this.loadState(GameState._saveState);
  }

  static saveUndoPoint() {
    GameState._instance._prevState =  GameState.cloneState();
  }

  static undo() {
    this.loadState(GameState._instance._prevState);
  }
  
  static loadState(state: GameState) {
    if (state) {
      GameState._instance = state;
      Ui.build();
      StateChangeEvent.dispatch();
    }
  }

}
