import { StateChangeEvent } from "../events/StateChangeEvent";
import { ActionScheduler } from "./ActionScheduler";

export abstract class Action {

    protected progress: number;
    protected targetProgress: number;

    schedule() {
        ActionScheduler.schedule(this);
    }

    execute() {
        if (!this.canExecute()) {
            return false;
        }
        this.doAction();
        StateChangeEvent.dispatch();
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