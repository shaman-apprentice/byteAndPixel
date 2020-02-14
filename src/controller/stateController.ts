import { createStore, Reducer, Store } from "redux";
import { GameController } from "./gameController";

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
        let gameController: GameController = GameController.getInstance();
        let rootReducer:Reducer = gameController.computeAction.bind(gameController);
        this.store = createStore(rootReducer);
    }



}