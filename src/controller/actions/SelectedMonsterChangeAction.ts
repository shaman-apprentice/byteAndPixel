import { GameState } from "../../GameState"
import { Action } from "./Action";
import { Monster } from "../../viewModel/Monster";

export class SelectedMonsterChangeAction extends Action {
  monster: Monster;

  doAction() {
    GameState.selectedMonster = this.monster.id;
  }

  canExecute(): boolean {
    return this.monster && this.monster.friendly
  }

  constructor(newSelectedMonsterId: number) {
    super();
    this.monster = GameState.monsters.get(newSelectedMonsterId);
  }
}
