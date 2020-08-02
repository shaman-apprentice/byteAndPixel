import { createDispatch } from './eventCreation';

export class InfoHideEvent {
    static type = "InfoHideEventType";

    static dispatch = createDispatch(InfoHideEvent.type);
}
