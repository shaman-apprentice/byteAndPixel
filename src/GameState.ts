import { TileMap } from './viewModel/TileMap';
import { getInitialMonsters } from './viewModel/utils/monster';
import { Monster } from 'viewModel/Monster';
import { MonsterAddEvent } from 'controller/events/MonsterAddEvent';
import { MonsterRemoveEvent } from 'controller/events/MonsterRemoveEvent';
import { Position } from "/viewModel/Position";
import { MouseHoverEvent } from 'controller/events/MouseHoverEvent';
import {initiateSkills} from './viewModel/utils/skills';

export class GameState {
  public static emitter = new EventTarget();

  public static map = new TileMap(16);
  public static monsters = getInitialMonsters();
  public static skills = initiateSkills();
  public static selectedMonster = 0;
  public static turn = 1;
  private static _mousePosition : Position = undefined;


  static addMonster(monster: Monster) {
    GameState.monsters.set(monster.id, monster);
    MonsterAddEvent.dispatch(monster);
  }

  static removeMonster(monster: Monster) {
    GameState.monsters.delete(monster.id);
    MonsterRemoveEvent.dispatch(monster);
    if (GameState.selectedMonster == monster.id) {
      //TODO: handle no valid selection target
      GameState.selectedMonster = GameState.monsters.getValues().find(candiate => candiate.friendly && candiate.id != monster.id)?.id ?? -1
    }
  }

  static get mousePosition() {
    return this._mousePosition;
  }

  static set mousePosition(position: Position) {
    this._mousePosition = position;
    MouseHoverEvent.dispatch(position);
  }


}
