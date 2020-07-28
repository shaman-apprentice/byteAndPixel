import { createDispatch } from './eventCreation';

export class SelectedMonsterChangedEvent {
    static type = "SelectedMonsterChangedEventType";

    static dispatch = createDispatch(SelectedMonsterChangedEvent.type);
}
