import { Action } from "./Action";
import { GameState } from "GameState";
import { Enemy } from "viewModel/enemy/enemy";
import { ActionScheduler } from "./ActionScheduler";

export class AiAction extends Action {

    protected doAction() {
        const nextToAct = GameState.monsters.getValues().filter(monster => monster instanceof Enemy)
        .map(monster => monster as Enemy)
        .find(enemy => enemy.actionPoints.current > 0)
        if (nextToAct) {
            ActionScheduler.scheduleBefore(new AiAction());
            ActionScheduler.scheduleBefore(nextToAct.aiAction());
        }
    }

}