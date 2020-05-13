import { createDispatch } from './eventCreation';

export class StateChangeEvent {
    static type = "StateChangeEventType";

    static dispatch = createDispatch(StateChangeEvent.type);
}
