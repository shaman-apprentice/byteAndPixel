import { TileMap } from './viewModel/TileMap';
import { MonsterAddEvent } from 'controller/events/MonsterAddEvent';
import { MonsterRemoveEvent } from 'controller/events/MonsterRemoveEvent';
import { MouseHoverEvent } from 'controller/events/MouseHoverEvent';
import { Skill } from 'controller/skills/Skill';
import { ActionSelectionEvent } from 'controller/events/ActionSelectionEvent';
import { SelectedMonsterChangedEvent } from 'controller/events/SelectedMonsterChangedEvent';
import { TilePosition } from 'model/TilePosition';
import { Monster } from 'model/Monster';
import { getInitialMonsters } from 'controller/monster';

export class GameState {
  public static emitter = new EventTarget();

  public static map = new TileMap(16);
  public static monsters = getInitialMonsters();
  public static turn = 1;
  private static _selectedMonster = undefined;
  private static _mousePosition : TilePosition = undefined;
  private static _selectedAction : Skill = undefined;


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

  static get selectedMonster() {
    return this._selectedMonster;
  }

  static set selectedMonster(monster: Monster) {
    this._selectedMonster = monster;
    SelectedMonsterChangedEvent.dispatch(monster);
  }

  static get mousePosition() {
    return this._mousePosition;
  }

  static set mousePosition(position: TilePosition) {
    this._mousePosition = position;
    MouseHoverEvent.dispatch(position);
  }

  static get selectedAction() {
    return this._selectedAction;
  }

  static set selectedAction(skill: Skill) {
    this._selectedAction = skill;
    ActionSelectionEvent.dispatch(skill);
  }


}
