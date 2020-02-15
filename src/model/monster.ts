import { Position } from "./position";

let idCounter = 0;

export class Monster {
    readonly id;

    constructor(
        public name: string, 
        public posi: Position, 
        public actionPoints: number = 2
    ) {
        this.id = idCounter++;
    }
}