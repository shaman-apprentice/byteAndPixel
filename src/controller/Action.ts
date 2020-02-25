import { GameState } from "../GameState";
import { StateChangeEvent } from "./StateChangeEvent";

export class Action {

    doExecute() {
        this.execute();
        StateChangeEvent.dispatch();
    }

    protected execute () {

    }

}