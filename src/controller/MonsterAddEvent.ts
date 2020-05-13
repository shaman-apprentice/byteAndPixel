import { GameState } from "../GameState";

export class MonsterAddEvent {
    static type = "MonsterAddEventType";

    static dispatch(detail?: object) {
        GameState.emitter.dispatchEvent(new CustomEvent(MonsterAddEvent.type, {detail}));
    }
}