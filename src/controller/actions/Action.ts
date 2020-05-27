import { StateChangeEvent } from "../events/StateChangeEvent";
import { Position } from "../../viewModel/Position";

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

    abstract target(): Position;

    abstract type(): String;

}