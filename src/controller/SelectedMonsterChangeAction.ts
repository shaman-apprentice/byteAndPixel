import { GameState} from "../GameState"
import { Action } from "./Action";

export class SelectedMonsterChangeAction extends Action {
  newSelectedMonsterId: number;

  doAction() {
    if (GameState.monsters[this.newSelectedMonsterId].friendly) {
      GameState.selectedMonster = this.newSelectedMonsterId;
    }
  }

  constructor(newSelectedMonsterId: number) {
    super();
    this.newSelectedMonsterId = newSelectedMonsterId;
  }
}
