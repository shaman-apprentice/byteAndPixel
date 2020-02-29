import { StateChangeEvent } from "./StateChangeEvent";

export class Action {

    execute() {
        this.doAction();
        StateChangeEvent.dispatch();
    }

    protected doAction () {

    }

}