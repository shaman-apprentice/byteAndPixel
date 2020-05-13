import { GameState } from "../../GameState"
import { Action } from "./Action";
import { Position } from "../../viewModel/Position";
import { isAdjacent } from "../../viewModel/utils/map";
import { Monster } from "../../viewModel/Monster";
import { Tile } from "viewModel/Tile";

export class ChangeTileSlimeAction extends Action {
  monster: Monster;
  targetTile: Tile;
  targetState: boolean;

  doAction() {
    this.monster.actionPoints -= 1;
    this.targetTile.slimed = this.targetState;
  }

  canExecute() {
    return this.monster
      && this.targetTile
      && this.monster.actionPoints >= 1
      && isAdjacent(this.monster.position, this.targetTile.position)
      && this.targetTile.slimed != this.targetState
  }

  constructor(monsterId: number, position: Position, slime: boolean) {
    super();
    this.monster = GameState.monsters.get(monsterId);
    this.targetTile = GameState.map.tiles.get(position);
    this.targetState = slime;
  }
}
