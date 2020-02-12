import { Point } from "./position";

export class Monster {
    
    private _name: string;
    private _position: Point;
    
    constructor(name: string, position: Point) {
        this._name = name;
        this._position = position;
    }

    public get name() {
        return this._name;
    }

    public get position() {
        return this._position;
    }
    
}