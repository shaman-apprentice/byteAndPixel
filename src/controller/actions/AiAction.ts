import { Action } from "./Action";
import { GameState } from "GameState";
import { Enemy } from "viewModel/enemy/enemy";

export class AiAction extends Action {

    protected doAction() {
        GameState.monsters.getValues().filter(monster => monster instanceof Enemy).map(monster => monster as Enemy).forEach(monster => {
            while(monster.actionPoints.current > 0) {
                monster.aiAction().execute();
            }
        })
    }

}