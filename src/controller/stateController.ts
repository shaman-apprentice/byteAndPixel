import { createStore, Reducer, Store, AnyAction } from "redux";
import { GameState } from "../model/gameState";
import { GameController } from "./gameController";
import { MOVE } from "../model/action/action";

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
            let oldMonster = state.monsters[state.currentMonster];
            let movedMonster = Object.assign({}, oldMonster, { position: action.to });
            let copiedMonsters = state.monsters.slice();
            copiedMonsters[state.currentMonster] = movedMonster;
            
            return Object.assign({}, state, {monsters: copiedMonsters});
        }

        return state;

    }

}