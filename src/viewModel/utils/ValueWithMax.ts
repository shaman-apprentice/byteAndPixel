export class ValueWithMax {

    private _current: number;
    private _max: number;

    constructor(max: number, current: number = max) {
        this._current = current;
        this._max = max;
    }

    get current() {
        return this._current;
    }

    get max() {
        return this._max;
    }

    set current(current: number) {
        this._current = Math.min(current, this._max);
    }

    set max(max: number) {
        this._max = max;
        this._current = Math.min(this._current, this._max);
    }

    changeCurrent(fn: (current: number) => number) {
        this._current = Math.min(fn(this._current), this._max)
    }

    add(value: number) {
        this.changeCurrent(current => current + value);
    }

    sub(value: number) {
        this.changeCurrent(current => current - value);
    }

    setToMax() {
        this._current = this._max;
    }
}