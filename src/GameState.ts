import { Map } from './viewModel/Map';
import { getInitialMonsters } from './viewModel/utils/monster';

export class GameState {
  public static emitter = new EventTarget();

  public static map = new Map(8);
  public static monsters = getInitialMonsters();
  public static selectedMonster = 0;
  public static turn = 1;

}
