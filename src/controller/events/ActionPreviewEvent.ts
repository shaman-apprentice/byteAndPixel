import { createDispatch } from './eventCreation';

export class ActionPreviewEvent {
    static type = "ActionPreviewEventType";

    static dispatch = createDispatch(ActionPreviewEvent.type);
}
