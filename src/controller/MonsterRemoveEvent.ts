import { GameState } from "../GameState";

export class MonsterRemoveEvent {
    static type = "MonsterRemoveEventType";

    static dispatch(detail?: object) {
        GameState.emitter.dispatchEvent(new CustomEvent(MonsterRemoveEvent.type, {detail}));
    }
}