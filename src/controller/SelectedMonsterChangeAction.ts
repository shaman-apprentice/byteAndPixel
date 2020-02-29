import { GameState} from "../GameState"
import { Action } from "./Action";

export class SelectedMonsterChangeAction extends Action {
  newSelectedMonsterId: number;

  execute() {
    if (GameState.monsters[this.newSelectedMonsterId].friendly) {
      GameState.selectedMonster = this.newSelectedMonsterId;
    }
  }

  constructor(newSelectedMonsterId: number) {
    super();
    this.newSelectedMonsterId = newSelectedMonsterId;
  }
}
