import { TileMap } from './model/TileMap';
import { MonsterAddEvent } from 'controller/events/MonsterAddEvent';
import { MonsterRemoveEvent } from 'controller/events/MonsterRemoveEvent';
import { SelectedMonsterChangedEvent } from 'controller/events/SelectedMonsterChangedEvent';
import { Monster } from 'model/Monster';
import { getInitialMonsters } from 'controller/monster';
import * as _ from "lodash";
import { HashMap } from 'utils/HashMap';

export class GameState {
  private static _instance : GameState = new GameState(new TileMap(16), getInitialMonsters(), 1, undefined);
  public static emitter = new EventTarget();

  private _map : TileMap;
  private _monsters : HashMap<number, Monster>;
  private _turn: number;
  private _selectedMonster : Monster;

  constructor (map: TileMap, monsters: HashMap<number, Monster>, turn: number, selectedMonster: Monster) {
    this._map = map;
    this._monsters = monsters;
    this._turn = turn;
    this._selectedMonster = selectedMonster;
  }
  
  public static set map(map : TileMap) {
    GameState._instance._map = map;
  }

  public static get map() {
    return GameState._instance._map;
  }

  public static set monsters(monsters: HashMap<number, Monster>) {
    GameState._instance._monsters = monsters;
  }

  public static get monsters() {
    return GameState._instance._monsters;
  }

  public static set turn(turn: number) {
    GameState._instance._turn = turn;
  }

  public static get turn() {
    return GameState._instance._turn;
  }

  public static set selectedMonster(monster: Monster) {
    GameState._instance._selectedMonster = monster;
    SelectedMonsterChangedEvent.dispatch(monster);
  }
  
  public static get selectedMonster() {
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

}
