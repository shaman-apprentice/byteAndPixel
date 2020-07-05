import { StateChangeEvent } from "../events/StateChangeEvent";

export abstract class Action {

    execute(): boolean {
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

}