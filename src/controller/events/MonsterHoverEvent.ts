import { createDispatch } from './eventCreation';

export class MonsterHoverEvent {
    static type = "MonsterHoverEventType";

    static dispatch = createDispatch(MonsterHoverEvent.type);
}
