export class ValueWithRange {

    constructor(private _max: number, private _current: number = _max, private _min: number = 0) { }

    deepClone() {
        return new ValueWithRange(this.max, this.current, this.min);
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