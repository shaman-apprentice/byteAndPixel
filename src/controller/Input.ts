import { monsterAtPosition } from "../viewModel/utils/monster";
import { GameState } from "../GameState";
import { Position } from "../viewModel/Position";
import { Action } from "./actions/Action";
import { Skill } from "./skills/Skill";
import { SkillAction } from "./actions/SkillAction";

export const tileSelected = (position: Position) => {
    const monsterToBeSelected = monsterAtPosition(position);
    if (monsterToBeSelected) {
        GameState.selectedMonster = monsterToBeSelected;
    }
}

export const decideAction = (position: Position) => {
    const selectedMonster = GameState.selectedMonster;

    if (!selectedMonster || !selectedMonster.friendly) {
        return;
    }

    const actions: Action[] = [new SkillAction(selectedMonster, position, selectedMonster.skillList[selectedMonster.skillList.length-1])
        , new SkillAction(selectedMonster, position, Skill.cleanse())
        , new SkillAction(selectedMonster, position, Skill.walk())];

    //Does the first action possible
    const result = actions.find(action => action.canExecute());
    return result;
}

export const tileClicked = (position: Position) => {
    decideAction(position)?.execute();
}

export const tileHover = (position: Position) => {
    GameState.mousePosition = position;
}