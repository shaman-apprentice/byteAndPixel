import { monsterAtPosition } from "../viewModel/utils/monster";
import { GameState } from "../GameState";
import { SelectedMonsterChangeAction } from "./actions/SelectedMonsterChangeAction";
import { AttackAction } from "./actions/AttackAction";
import { ChangeTileSlimeAction } from "./actions/ChangeTileSlimeAction";
import { MoveAction } from "./actions/MoveAction";
import { Position } from "../viewModel/Position";
import { Action } from "./actions/Action";

export const tileClicked = (position: Position) => {

    const clickedMonsterId = monsterAtPosition(position);
    const selectedMonsterId = GameState.selectedMonster;
    const actions: Action[] = [new SelectedMonsterChangeAction(clickedMonsterId)
        , new AttackAction(selectedMonsterId, position)
        , new ChangeTileSlimeAction(selectedMonsterId, position, false)
    , new MoveAction(selectedMonsterId, position)];

    //Does the first action possible
    const result = actions.find(action => action.execute());
}