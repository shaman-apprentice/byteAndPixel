import { createDispatch } from './eventCreation';

export class ActionSelectionEvent {
    static type = "ActionSelectionEvent";

    static dispatch = createDispatch(ActionSelectionEvent.type);
}
