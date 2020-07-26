import { monsterAtPosition } from "../viewModel/utils/monster";
import { GameState } from "../GameState";
import { Position } from "../viewModel/Position";
import { SkillAction } from "./actions/SkillAction";
import { SkillType } from "./skills/Skill";

export const tileSelected = (position: Position) => {
    const monsterToBeSelected = monsterAtPosition(position);
    if (monsterToBeSelected) {
        GameState.selectedMonster = monsterToBeSelected;
    }
}

export const decideAction = (position: Position) => {
    const selectedMonster = GameState.selectedMonster;
    var selectedSkill = GameState.selectedAction;

    if (!selectedMonster || !selectedMonster.friendly) {
        return;
    }

    if (!selectedSkill) {
        selectedSkill = selectedMonster.skillByType(SkillType.MOVE);
    }

    const action = new SkillAction(selectedMonster, position, selectedSkill);
    if (action.canExecute()) {
        return action;
    }

    return undefined;
}

export const tileClicked = (position: Position) => {
    decideAction(position)?.execute();
}

export const tileHover = (position: Position) => {
    GameState.mousePosition = position;
}