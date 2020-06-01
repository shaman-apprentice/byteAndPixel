import { createDispatch } from './eventCreation';

export class MapMoveEvent {
    static type = "MapMoveEventType";

    static dispatch = createDispatch(MapMoveEvent.type);
}
