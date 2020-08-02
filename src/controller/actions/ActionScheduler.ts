import { Action } from "./Action";

export class ActionScheduler {

    static actions: Action[] = [];
    static current: Action;

    static schedule(action: Action) {
        this.actions.push(action);
    }

    static scheduleBefore(action: Action) {
        this.actions.unshift(action);
    }

    static work(delta: number) {
        while (!this.current && this.actions.length > 0) {
            this.current = this.actions.shift();
            if (this.current && !this.current.canExecute) {
                this.current = undefined;
            }
        }
        if (this.current) {
            this.current.animate(delta);
            if (this.current.finished()) {
                this.current.execute();
                this.current = undefined;
            }
        }
    }

}