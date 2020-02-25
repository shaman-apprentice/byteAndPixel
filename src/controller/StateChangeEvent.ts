import { GameState } from "../GameState";

export class StateChangeEvent {
    static type = "StateChangeEventType";

    static dispatch() {
        GameState.emitter.dispatchEvent(new CustomEvent(StateChangeEvent.type));
    }
}