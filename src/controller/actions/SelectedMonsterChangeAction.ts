import { GameState } from "../../GameState"
import { Action } from "./Action";
import { Monster } from "../../viewModel/Monster";
import { Position } from "../../viewModel/Position";

export class SelectedMonsterChangeAction extends Action {
  monster: Monster;

  doAction() {
    GameState.selectedMonster = this.monster.id;
  }

  canExecute(): boolean {
    return this.monster ? true : false;
  }

  constructor(newSelectedMonsterId: number) {
    super();
    this.monster = GameState.monsters.get(newSelectedMonsterId);
  }

  target(): Position {
    return this.monster.position;
  }
  type(): String {
    return "activate";
  }
}
