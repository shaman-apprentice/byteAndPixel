import { StateChangeEvent } from "../events/StateChangeEvent";

export abstract class Action {

    protected progress: number;
    protected targetProgress: number;

    execute() {
        if (!this.canExecute()) {
            return false;
        }
        this.doAction();
        StateChangeEvent.dispatch();
        return true;
    }

    protected doAction() {

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