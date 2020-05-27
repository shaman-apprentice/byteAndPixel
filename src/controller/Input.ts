import { monsterAtPosition } from "../viewModel/utils/monster";
import { GameState } from "../GameState";
import { SelectedMonsterChangeAction } from "./actions/SelectedMonsterChangeAction";
import { AttackAction } from "./actions/AttackAction";
import { ChangeTileSlimeAction } from "./actions/ChangeTileSlimeAction";
import { MoveAction } from "./actions/MoveAction";
import { Position } from "../viewModel/Position";
import { Action } from "./actions/Action";

export const tileSelected = (position: Position) => {
    const clickedMonsterId = monsterAtPosition(position);
    const action = new SelectedMonsterChangeAction(clickedMonsterId);
    if (action.canExecute()) {
        action.execute();
    }
}

export const tileClicked = (position: Position) => {
    const selectedMonsterId = GameState.selectedMonster;
    const selectedMonster = GameState.monsters.get(selectedMonsterId);

    if (!selectedMonster || !selectedMonster.friendly) {
        return;
    }

    const actions: Action[] = [new AttackAction(selectedMonsterId, position)
        , new ChangeTileSlimeAction(selectedMonsterId, position, false)
        , new MoveAction(selectedMonsterId, position)];

    //Does the first action possible
    const result = actions.find(action => action.execute());
}