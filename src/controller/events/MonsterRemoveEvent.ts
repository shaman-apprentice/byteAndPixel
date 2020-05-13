import { createDispatch } from './eventCreation';

export class MonsterRemoveEvent {
    static type = "MonsterRemoveEventType";

    static dispatch = createDispatch(MonsterRemoveEvent.type);
}
