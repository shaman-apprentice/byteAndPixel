import { monsterAtPosition } from "../viewModel/utils/monster";
import { GameState } from "../GameState";
import { SkillAction } from "./actions/SkillAction";
import { TilePosition } from "model/TilePosition";

export const tileSelected = (position: TilePosition) => {
    const monsterToBeSelected = monsterAtPosition(position);
    if (monsterToBeSelected) {
        GameState.selectedMonster = monsterToBeSelected;
    }
}

export const decideAction = (position: TilePosition) => {
    const selectedMonster = GameState.selectedMonster;
    var selectedSkill = GameState.selectedAction;

    if (!selectedMonster || !selectedMonster.friendly || !selectedSkill) {
        return;
    }

    const action = new SkillAction(selectedMonster, position, selectedSkill);
    if (action.canExecute()) {
        return action;
    }

    return undefined;
}

export const tileClicked = (position: TilePosition) => {
    decideAction(position)?.execute();
}

export const tileHover = (position: TilePosition) => {
    GameState.mousePosition = position;
}