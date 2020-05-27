import { TileMap } from './viewModel/TileMap';
import { getInitialMonsters } from './viewModel/utils/monster';
import { Monster } from 'viewModel/Monster';
import { MonsterAddEvent } from 'controller/events/MonsterAddEvent';
import { MonsterRemoveEvent } from 'controller/events/MonsterRemoveEvent';

export class GameState {
  public static emitter = new EventTarget();

  public static map = new TileMap(8);
  public static monsters = getInitialMonsters();
  public static selectedMonster = 0;
  public static turn = 1;


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


}
