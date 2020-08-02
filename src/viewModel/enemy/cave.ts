import { Enemy } from "./enemy";
import { GameState } from "GameState";
import { neighbors } from "viewModel/utils/map";
import { Action } from "controller/actions/Action";
import { SkillAction } from "controller/actions/SkillAction";
import { SkillType } from "controller/skills/Skill";
import { Spider } from "./spider";

export class Cave extends Enemy {
    cooldown = 0;


    aiAction: () => Action = () => {
        this.cooldown = ((this.cooldown + 1) % 3)
        var action: Action = undefined
        if (this.cooldown == 0) {
            action = this.spawnAction();
        }
        return action ? action : new SkillAction(this, this.position, this.skillByType(SkillType.REST))
    }

    spawnAction() : Action {
        const tiles = GameState.map.tiles;
        const monsters = GameState.monsters;
        const takenPositions = monsters.getValues().map(monster => monster.position)
        const spawnPosition = neighbors(this.position).filter(position => tiles.has(position)).find(position => !takenPositions.find(pos => position.isEqual(pos)));
        return new SkillAction(this, spawnPosition, Spider.spawnAction());
    }
}