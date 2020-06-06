import * as PIXI from 'pixi.js';

import { GuiElem } from "./GuiElem";
import { width } from '../../index';

export class Design extends GuiElem{
    name:string;
    pixiElem: PIXI.Sprite;
    

    constructor (name: string, baseDesign: string){
        super();
        this.name = name;
        this.pixiElem = PIXI.Sprite.from(baseDesign);
        
        var scale = 0.8;
        this.pixiElem.scale.set(scale, scale);
        this.pixiElem.position.set(width -700, 350);
    }

    
}