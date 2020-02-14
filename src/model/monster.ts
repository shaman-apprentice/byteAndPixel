import { Point } from "./position";

export class Monster {

    _name: string;
    _position: Point;

    constructor(name: string, position: Point) {
        this._name = name;
        this._position = position;
    }

    get name(): string {
        return this._name;
    }

    get position(): Point {
        return this._position;
    }

    change(name: string = this._name, position: Point = this._position) {
        return new Monster(name, position);
    }
}