import { GameState} from "../GameState"
import { Action } from "./Action";
import { Position } from "../viewModel/Position";
import { isAdjacent } from "../viewModel/utils/map";

export class ChangeTileSlimeAction extends Action {
  position: Position;
  monsterId: number;
  slime: boolean;

  execute() {
    const monster = GameState.monsters[this.monsterId];

    if (monster.actionPoints <= 0 || !isAdjacent(monster.position, this.position))
        return;

    GameState.map.tiles[this.position.x][this.position.y].slimed = this.slime;
    monster.actionPoints -= 1;
  }

  constructor(monsterId: number, position: Position, slime: boolean) {
    super();
    this.monsterId = monsterId;
    this.position = position;
    this.slime = slime;
  }
}
