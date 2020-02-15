import { Position } from "./position";

export class Monster {

    _name: string;
    _position: Position;
    _actionPoints: number;

    constructor(name: string, position: Position, actionPoints: number) {
        this._name = name;
        this._position = position;
        this._actionPoints = actionPoints;
    }

    get name(): string {
        return this._name;
    }

    get position(): Position {
        return this._position;
    }

    get actionPoints(): number {
        return this._actionPoints;
    }

    change(name: string = this._name, position: Position = this._position, actionPoints: number = this._actionPoints) {
        return new Monster(name, position, actionPoints);
    }
}