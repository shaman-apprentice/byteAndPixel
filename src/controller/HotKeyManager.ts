import { MapMoveEvent } from "controller/events/MapMoveEvent";
import { GameState } from "GameState";
import { SkillType } from "controller/skills/Skill";
import { SkillAction } from "controller/actions/SkillAction";
import { TilePosition } from "model/TilePosition";
import { ViewState } from "ViewState";

export const handleKeyPress = (key: string) => {
    switch (key) {
        // move Camera over map
        case "ArrowLeft": MapMoveEvent.dispatch({ x: 40, y: 0 }); break;
        case "ArrowRight": MapMoveEvent.dispatch({ x: -40, y: 0 }); break;
        case "ArrowUp": MapMoveEvent.dispatch({ x: 0, y: 40 }); break;
        case "ArrowDown": MapMoveEvent.dispatch({ x: 0, y: -40 }); break;
        // select action
        case "m": selectSkillByTyoe(SkillType.MOVE); break;
        case "t": selectSkillByTyoe(SkillType.CLEANSE); break;
        case "r": selectSkillByTyoe(SkillType.REST); break;
        case "1": selectSkillByTyoe(SkillType.ATTACK, 0); break;
        case "2": selectSkillByTyoe(SkillType.ATTACK, 1); break;
        case "3": selectSkillByTyoe(SkillType.ATTACK, 2); break;
        case "4": selectSkillByTyoe(SkillType.ATTACK, 3); break;
        case "5": selectSkillByTyoe(SkillType.ATTACK, 4); break;
        case "6": selectSkillByTyoe(SkillType.ATTACK, 5); break;
        case "7": selectSkillByTyoe(SkillType.ATTACK, 6); break;
        case "8": selectSkillByTyoe(SkillType.ATTACK, 7); break;
        case "9": selectSkillByTyoe(SkillType.ATTACK, 8); break;
        case "0": selectSkillByTyoe(SkillType.ATTACK, 9); break;
        // directly execute action
        case "w": moveInDirection(TilePosition.NORTH_WEST); break;
        case "e": moveInDirection(TilePosition.NORTH_EAST); break;
        case "a": moveInDirection(TilePosition.WEST); break;
        case "d": moveInDirection(TilePosition.EAST); break;
        case "y": moveInDirection(TilePosition.SOUTH_WEST); break;
        case "x": moveInDirection(TilePosition.SOUTH_EAST); break;
        case " ": rest(); break;
    }
}

const selectSkillByTyoe = (skilltype: SkillType, index: number = 0) => {
    const monster = GameState.selectedMonster;
    if (!monster) { return; }
    const skill = monster.skillByType(skilltype, index);
    if (skill) {
        ViewState.selectedAction = skill;
    }
}

const moveInDirection = (delta: TilePosition) => {
    const monster = GameState.selectedMonster;
    if (!monster) { return; }
    const skill = monster.skillByType(SkillType.MOVE);
    if (skill) {
        const action = new SkillAction(monster, monster.position.add(delta), skill);
        if (action.canExecute()) {
            action.execute();
        }
    }
}

const rest = () => {
    const monster = GameState.selectedMonster;
    if (!monster) { return; }
    const skill = monster.skillByType(SkillType.REST);
    if (skill) {
        const action = new SkillAction(monster, monster.position, skill);
        if (action.canExecute()) {
            action.execute();
        }
    }
}