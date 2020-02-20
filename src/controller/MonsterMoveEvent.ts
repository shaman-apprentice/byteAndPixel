import { GameState } from "../GameState";
import { Position } from "../viewModel/Position";
import { isAdjacent } from "../viewModel/utils/map";

export class MonsterMoveEvent extends CustomEvent<{id: number, position: Position}> {
  static type = "MonsterMoveEventType";

  static dispatch(monsterId: number, posi: Position) {
    const monster = GameState.monsters[monsterId];

    if (monster.actionPoints <= 0 || !isAdjacent(monster.position, posi))
        return;

    monster.position = posi;
    monster.actionPoints -= 1;
    GameState.emitter.dispatchEvent(new MonsterMoveEvent(monsterId, posi));
  }

  constructor(monsterId: number, posi: Position) {
    super(MonsterMoveEvent.type, {
      detail: {
        id: monsterId,
        position: posi,
      }
    })
  }
}
