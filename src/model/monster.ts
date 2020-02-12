import { Point } from "./position";

export class Monster {
    
    name: string;
    position: Point;
    
    constructor(name: string, position: Point) {
        this.name = name;
        this.position = position;
    }  
}