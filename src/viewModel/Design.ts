import * as PIXI from 'pixi.js';

import { Position } from "./Position";
import { IGuiElem } from "./IGuiElem";
import { width } from '../index';

export class Design implements IGuiElem{
    name:string;
    pixiElem: PIXI.Sprite;
    

    constructor (name: string, baseDesign: string){
        this.name = name;
        this.pixiElem = PIXI.Sprite.from(baseDesign);
        
        var scale = 0.8;
        this.pixiElem.scale.set(scale, scale);
        this.pixiElem.position.set(width -700, 350);
    }

    
}