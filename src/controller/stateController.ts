import { createStore, Reducer, Store, AnyAction } from "redux";
import { GameState } from "../model/gameState";
import { GameController } from "./gameController";
import { MOVE } from "../model/action/action";
import { Point } from "../model/position";

export class StateController {
    private static instance : StateController;
    static getInstance(): StateController {
        if (!this.instance) {
            this.instance = new StateController();
        }
        return this.instance;
    }

    public store: Store
    
    constructor() {
        let rootReducer:Reducer = this.computeMove;
        this.store = createStore(rootReducer);
    }

    computeMove(state: GameState = GameController.getInstance().initialState(), action: AnyAction): GameState {
        if (action.type == MOVE) {
            let index: number = state.currentMonster;
            let moveTarget: Point = action.to;
            let movedMonster = state.monsters[index].change(undefined, moveTarget);
            
            return state.changeMonster(index, movedMonster)
        }

        return state;

    }

}