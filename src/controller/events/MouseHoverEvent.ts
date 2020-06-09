import { createDispatch } from './eventCreation';

export class MouseHoverEvent {
    static type = "MouseHoverEvent";

    static dispatch = createDispatch(MouseHoverEvent.type);
}
