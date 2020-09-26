export class ValueWithRange {

    private _current: number;
    private _min: number;
    private _max: number;

    constructor(max: number, current: number = max, min: number = 0) {
        this._current = current;
        this._max = max;
        this._min = min;
    }

    get current() {
        return this._current;
    }

    get max() {
        return this._max;
    }

    set current(current: number) {
        this._current = this.clamp(current);
    }

    set max(max: number) {
        this._max = max;
        this._current = this.clamp(this._current);
    }

    set min(min: number) {
        this._min = min;
        this._current = this.clamp(this._current);
    }

    private changeCurrent(fn: (current: number) => number) {
        this._current = this.clamp(fn(this._current));
    }

    private clamp(value: number) {
        return Math.max(this._min, Math.min(value, this._max));
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

    setToMin() {
        this._current = this._min;
    }
}