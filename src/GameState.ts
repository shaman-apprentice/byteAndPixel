import * as _ from "lodash";
import { TileMap } from './model/TileMap';
import { MonsterAddEvent } from 'controller/events/MonsterAddEvent';
import { MonsterRemoveEvent } from 'controller/events/MonsterRemoveEvent';
import { SelectedMonsterChangedEvent } from 'controller/events/SelectedMonsterChangedEvent';
import { Monster } from 'model/Monster';
import { getInitialMonsters } from 'controller/monster';
import { HashMap } from 'utils/HashMap';
import { Ui } from "view/ui/ui";

export class GameState {
  private static _instance: GameState = new GameState(new TileMap(16), getInitialMonsters(), 1, undefined);
  private static _saveState = undefined;
  public static emitter = new EventTarget();

  private _map: TileMap;
  private _monsters: HashMap<number, Monster>;
  private _turn: number;
  private _selectedMonster: Monster;

  constructor(map: TileMap, monsters: HashMap<number, Monster>, turn: number, selectedMonster: Monster) {
    this._map = map;
    this._monsters = monsters;
    this._turn = turn;
    this._selectedMonster = selectedMonster;
  }

  static set map(map: TileMap) {
    GameState._instance._map = map;
  }

  static get map() {
    return GameState._instance._map;
  }

  static set monsters(monsters: HashMap<number, Monster>) {
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

  static save() {
    //const current = GameState._instance;
    //const clonedMap = current._map.clone();
    //const clonedMonster = current._monsters.clone();
    //const clonedSelectedMonster = clonedMonster.get(current._selectedMonster.id);
    //GameState._saveState = new GameState(clonedMap, clonedMonster, current._turn, clonedSelectedMonster )
    console.log("save");
  }
  
  static load() {
    //GameState._instance = GameState._saveState;
    console.log("load");
    Ui.build();
  }

}
