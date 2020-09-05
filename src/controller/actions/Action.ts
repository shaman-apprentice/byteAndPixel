import { StateChangeEvent } from "../events/StateChangeEvent";

export abstract class Action {

    protected progress: number;
    protected targetProgress: number;

    async execute() {
        if (!this.canExecute()) {
            return false;
        }
        await this.doAction();
        StateChangeEvent.dispatch();
        return true;
    }

    protected async doAction() {

    }

    canExecute(): boolean {
        return true;
    }

    finished(): boolean {
        return true;
    }

    animate(delta: number) {

    }

}