export class ModifiedValue {
    private _override: number | null = undefined;
    private _addition: number = 0;
    private _increase: number = 1;
    private _more: number = 1;

    public set override (value: number) {
        if (this._override) {
            this._override = value;
        } else {
            this._override = Math.min(this._override, value);
        }
    }

    public set addition (value: number) {
        this._addition += value;
    }

    public set increase (value: number) {
        this._increase += value;
    }

    public set more (value: number) {
        this._more *= value;
    }

    public modifiedValue (baseValue: number) {
        return (this._override) ? this._override : baseValue * this._more * this._increase + this._addition;
    }
}