import { Action } from "./Action";
import { GameState } from "GameState";
import { Enemy } from "model/enemy/enemy";

export class AiAction extends Action {

    protected async doAction() {
        const monsters = GameState.monsters.getValues().filter(monster => monster instanceof Enemy) as Enemy[];
        for (let monster of monsters) {
            while(monster.actionPoints.current > 0) {
                await monster.aiAction().execute();
            }
        }
    }
}
