import { monsterIdAtPosition } from "../viewModel/utils/monster";
import { GameState } from "../GameState";
import { SelectedMonsterChangeAction } from "./actions/SelectedMonsterChangeAction";
import { Position } from "../viewModel/Position";
import { Action } from "./actions/Action";
import { Skill } from "./skills/Skill";
import { SkillAction } from "./actions/SkillAction";

export const tileSelected = (position: Position) => {
    const clickedMonsterId = monsterIdAtPosition(position);
    const action = new SelectedMonsterChangeAction(clickedMonsterId);
    if (action.canExecute()) {
        action.execute();
    }
}

export const decideAction = (position: Position) => {
    const selectedMonsterId = GameState.selectedMonster;
    const selectedMonster = GameState.monsters.get(selectedMonsterId);

    if (!selectedMonster || !selectedMonster.friendly) {
        return;
    }

    const actions: Action[] = [new SkillAction(selectedMonsterId, position, selectedMonster.skillList[selectedMonster.skillList.length-1])
        , new SkillAction(selectedMonsterId, position, Skill.cleanse())
        , new SkillAction(selectedMonsterId, position, Skill.walk())];

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