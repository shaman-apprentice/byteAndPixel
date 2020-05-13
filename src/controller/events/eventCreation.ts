import { GameState } from '../../GameState'

export const createDispatch = (name: string) =>
    (detail?: object) =>
        GameState.emitter.dispatchEvent(new CustomEvent(name, {detail}));
        