import * as PIXI from 'pixi.js';

import { GuiElem } from "../../view/GeneralAbstracts/GuiElem";
import { width } from '../../index';

export class Design extends GuiElem{
    pixiElem: PIXI.Sprite;
    

    constructor (baseDesign: string){
        super();
        this.pixiElem = PIXI.Sprite.from(baseDesign);
        
        var scale = 0.8;
        this.pixiElem.scale.set(scale, scale);
        this.pixiElem.position.set(width -700, 350);
    }

    
}