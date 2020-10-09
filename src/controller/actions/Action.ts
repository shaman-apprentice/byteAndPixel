import { GameState } from "GameState";
import { StateChangeEvent } from "../events/StateChangeEvent";

export abstract class Action {

    private static actions: Action[] = [];
    protected progress: number;
    protected targetProgress: number;

    async execute() {
        if (!this.canExecute()) {
            return false;
        }
        if (Action.actions.length == 0) {
            GameState.saveUndoPoint();
        }
        Action.actions.push(this);
        await this.doAction();
        StateChangeEvent.dispatch();
        Action.actions.pop();
        return true;
    }

    protected async doAction() {

    }

    canExecute(): boolean {
        return true;
    }

    finished(): boolean {
        return true;
    }

    animate(delta: number) {

    }

}