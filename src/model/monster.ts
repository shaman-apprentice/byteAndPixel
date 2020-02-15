import { Position } from "./position";

export class Monster {

    constructor(
        readonly name: string, 
        readonly position: Position, 
        readonly actionPoints: number
    ) {}

    change(name: string = this.name, position: Position = this.position, actionPoints: number = this.actionPoints) {
        return new Monster(name, position, actionPoints);
    }
}