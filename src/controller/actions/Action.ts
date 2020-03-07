import { StateChangeEvent } from "../StateChangeEvent";

export class Action {

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

    protected canExecute(): boolean {
        return true;
    }

}