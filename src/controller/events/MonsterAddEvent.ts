import { createDispatch } from './eventCreation';

export class MonsterAddEvent {
    static type = "MonsterAddEventType";

    static dispatch = createDispatch(MonsterAddEvent.type);
}
